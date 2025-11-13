package com.ssafy.a208.domain.contest.service;

import com.ssafy.a208.domain.contest.dto.SubmissionCreateReq;
import com.ssafy.a208.domain.contest.dto.SubmissionDetailRes;
import com.ssafy.a208.domain.contest.dto.SubmissionListItem;
import com.ssafy.a208.domain.contest.dto.SubmissionListRes;
import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.domain.contest.entity.Submission;
import com.ssafy.a208.domain.contest.entity.SubmissionFile;
import com.ssafy.a208.domain.contest.exception.ContestNotFoundException;
import com.ssafy.a208.domain.contest.exception.SubmissionFileNotFoundException;
import com.ssafy.a208.domain.contest.exception.SubmissionNotFoundException;
import com.ssafy.a208.domain.contest.repository.ContestRepository;
import com.ssafy.a208.domain.contest.repository.SubmissionRepository;
import com.ssafy.a208.domain.contest.util.ContestValidator;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.reader.ProfileReader;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final ContestRepository contestRepository;
    private final MemberReader memberReader;
    private final ProfileReader profileReader;

    private final S3Service s3Service;
    private final SubmissionFileService submissionFileService;
    private final VoteService voteService;
    private final ContestValidator contestValidator;

    @Transactional
    public SubmissionDetailRes createSubmission(
            Long contestId,
            SubmissionCreateReq submissionCreateReq,
            CustomUserDetails customUserDetails
    ) {
        Member member = memberReader.getMemberById(customUserDetails.memberId());
        Profile profile = profileReader.getProfile(member.getId());
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        contestValidator.validateSubmissionDate(contest);

        PromptType type = contest.getType();
        Submission submission = Submission.builder()
                .prompt(submissionCreateReq.prompt())
                .description(submissionCreateReq.description())
                .result(type == PromptType.TEXT ? submissionCreateReq.result() : null)
                .type(type)
                .contest(contest)
                .member(member)
                .build();

        String fileUrl = null;
        if(type == PromptType.IMAGE) {
            fileUrl = submissionFileService.createSubmissionFile(submission);
        }

        submissionRepository.save(submission);

        return SubmissionDetailRes.from(submission, fileUrl, s3Service.getCloudFrontUrl(profile.getFilePath()), 0L);
    }

    @Transactional(readOnly = true)
    public SubmissionListRes getSubmissionList(
            Long contestId,
            int page,
            int size,
            String sorter,
            String filterAuthor
    ) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);

        contestValidator.validateViewDate(contest);

        page = Math.max(0, page - 1);
        Sort sort = switch (sorter) {
            case "updatedDesc" -> Sort.by(Sort.Direction.DESC, "updatedAt");
            case "voteDesc" -> Sort.by(Sort.Direction.DESC, "voteCnt");
            default -> Sort.by(Sort.Direction.DESC, "updatedAt");
        };
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Submission> list = (filterAuthor == null || filterAuthor.trim().isEmpty())
                ? submissionRepository.findByContest_Id(contestId, pageable)
                : submissionRepository.findByContest_IdAndMember_Nickname(contestId, filterAuthor, pageable);

        List<SubmissionListItem> submissionListRes = list.getContent().stream()
                .map(submission -> {
                    Long authorId = submission.getMember().getId();
                    Profile profile = profileReader.getProfile(authorId);
                    String profileUrl = (profile != null)
                            ? s3Service.getCloudFrontUrl(profile.getFilePath())
                            : null;

                    String submissionUrl = null;
                    if(submission.getType() == PromptType.IMAGE) {
                        // TODO: N+1 확인
                        SubmissionFile file = submissionFileService.getSubmissionFile(submission.getId()).orElse(null);
                        submissionUrl = (file != null)
                                ? s3Service.getCloudFrontUrl(file.getFilePath())
                                : null;
                    }

                    long voteCnt = voteService.getVoteCount(submission);

                    return SubmissionListItem.from(submission, profileUrl, submissionUrl, voteCnt);
                })
                .toList();

        Page<SubmissionListItem> submissionItems = new PageImpl<>(submissionListRes, pageable, list.getTotalElements());

        return SubmissionListRes.from(submissionItems);
    }

    @Transactional(readOnly = true)
    public SubmissionDetailRes getSubmissionDetail(Long contestId, Long submissionId) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(SubmissionNotFoundException::new);
        Profile profile = profileReader.getProfile(submission.getMember().getId());

        contestValidator.validateViewDate(contest);

        String fileUrl = null;
        if(submission.getType() == PromptType.IMAGE) {
            SubmissionFile file = submissionFileService.getSubmissionFile(submission.getId())
                    .orElseThrow(SubmissionFileNotFoundException::new);
            fileUrl = s3Service.getCloudFrontUrl(file.getFilePath());
        }

        long voteCnt = voteService.getVoteCount(submission);

        return SubmissionDetailRes.from(submission, fileUrl, s3Service.getCloudFrontUrl(profile.getFilePath()), voteCnt);
    }

    @Transactional
    public void updateSubmission(
            Long contestId,
            Long submissionId,
            SubmissionCreateReq submissionCreateReq,
            CustomUserDetails customUserDetails
    ) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(SubmissionNotFoundException::new);
        Member member = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateSubmissionDate(contest);
        contestValidator.validateHost(member.getId(), submission.getMember().getId());

        submission.updateSubmission(
                submissionCreateReq.prompt(),
                submissionCreateReq.description(),
                submissionCreateReq.result()
        );

        if(submission.getType() == PromptType.IMAGE) {
            SubmissionFile oldFile = submissionFileService.getSubmissionFile(submission.getId()).orElse(null);

            if(oldFile == null) {
                submissionFileService.createSubmissionFile(submission);
            } else {
                submissionFileService.updateSubmissionFile(oldFile, submissionCreateReq.result());
            }
        }
    }

    @Transactional
    public void deleteSubmission(Long contestId, Long submissionId, CustomUserDetails customUserDetails) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(SubmissionNotFoundException::new);
        Member member = memberReader.getMemberById(customUserDetails.memberId());
        PromptType type = submission.getType();

        contestValidator.validateSubmissionDate(contest);
        contestValidator.validateHost(member.getId(), submission.getMember().getId());

        if(type == PromptType.IMAGE) {
            submissionFileService.getSubmissionFile(submission.getId())
                    .ifPresent(file -> s3Service.deleteFile(file.getFilePath()));
        }

        submissionRepository.delete(submission);
    }
}

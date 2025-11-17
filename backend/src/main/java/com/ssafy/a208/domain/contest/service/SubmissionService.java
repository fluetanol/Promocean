package com.ssafy.a208.domain.contest.service;

import com.ssafy.a208.domain.contest.document.SubmissionDocument;
import com.ssafy.a208.domain.contest.dto.SubmissionCreateReq;
import com.ssafy.a208.domain.contest.dto.SubmissionDetailRes;
import com.ssafy.a208.domain.contest.dto.SubmissionListItem;
import com.ssafy.a208.domain.contest.dto.SubmissionListRes;
import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.domain.contest.entity.Submission;
import com.ssafy.a208.domain.contest.entity.SubmissionFile;
import com.ssafy.a208.domain.contest.exception.ContestNotFoundException;
import com.ssafy.a208.domain.contest.exception.DuplicateSubmissionException;
import com.ssafy.a208.domain.contest.exception.SubmissionFileNotFoundException;
import com.ssafy.a208.domain.contest.exception.SubmissionNotFoundException;
import com.ssafy.a208.domain.contest.repository.ContestRepository;
import com.ssafy.a208.domain.contest.repository.SubmissionElasticsearchRepository;
import com.ssafy.a208.domain.contest.repository.SubmissionRepository;
import com.ssafy.a208.domain.contest.util.ContestValidator;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.reader.ProfileReader;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.time.LocalDateTime;
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
    private final SubmissionElasticsearchRepository submissionSearchRepository;
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

        if(submissionRepository.existsByContest_IdAndMember_Id(contestId, member.getId())) {
            throw new DuplicateSubmissionException();
        }

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

        SubmissionDocument document = SubmissionDocument.builder()
                .id(submission.getId())
                .prompt(submission.getPrompt())
                .description(submission.getDescription())
                .result(submission.getResult())
                .type(submission.getType())
                .voteCount(submission.getVoteCount())
                .filePath(fileUrl)
                .createdAt(submission.getCreatedAt())
                .updatedAt(submission.getUpdatedAt())
                .contestId(contestId)
                .memberId(member.getId())
                .memberNickname(member.getNickname())
                .profilePath(profile.getFilePath())
                .build();
        submissionSearchRepository.save(document);

        return SubmissionDetailRes.from(submission, fileUrl, s3Service.getCloudFrontUrl(profile.getFilePath()), false);
    }

    @Deprecated
    @Transactional(readOnly = true)
    public SubmissionListRes getSubmissionListLegacy(
            Long contestId,
            int page,
            int size,
            String sorter,
            String filterAuthor,
            String filterKeyword
    ) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);

        contestValidator.validateViewDate(contest);

        page = Math.max(0, page - 1);
        Sort sort = switch (sorter) {
            case "latest"   -> Sort.by(Sort.Direction.DESC, "updatedAt");
            case "oldest"   -> Sort.by(Sort.Direction.ASC, "updatedAt");
            case "voteDesc" -> Sort.by(Sort.Direction.DESC, "voteCount");
            case "voteAsc"  -> Sort.by(Sort.Direction.ASC, "voteCount");
            default         -> Sort.by(Sort.Direction.DESC, "updatedAt");
        };
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Submission> list;
        String author = filterAuthor.trim();
        String keyword = filterKeyword.trim();
        boolean authorFlag = !author.isEmpty();
        boolean keywordFlag = !keyword.isEmpty();

        if(authorFlag && keywordFlag) {
            list = submissionRepository.findByContest_IdAndMember_NicknameAndDescriptionContainingIgnoreCase(
                    contestId, author, keyword, pageable);
        } else if(!authorFlag && keywordFlag) {
            list = submissionRepository.findByContest_IdAndDescriptionContainingIgnoreCase(contestId, keyword, pageable);
        } else if(authorFlag) {
            list = submissionRepository.findByContest_IdAndMember_Nickname(contestId, author, pageable);
        } else {
            list = submissionRepository.findByContest_Id(contestId, pageable);
        }

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

                    return SubmissionListItem.fromLegacy(submission, profileUrl, submissionUrl);
                })
                .toList();

        Page<SubmissionListItem> submissionItems = new PageImpl<>(submissionListRes, pageable, list.getTotalElements());

        return SubmissionListRes.from(submissionItems);
    }

    @Transactional(readOnly = true)
    public SubmissionListRes getSubmissionList(
            Long contestId,
            int page,
            int size,
            String sorter,
            String filterAuthor,
            String filterKeyword
    ) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);

        contestValidator.validateViewDate(contest);

        Page<SubmissionDocument> submissionDocuments = submissionSearchRepository.searchSubmissions(
                contestId, page, size, sorter, filterAuthor, filterKeyword
        );

        Page<SubmissionListItem> submissionItems = submissionDocuments.map(doc -> {
            String profileUrl = s3Service.getCloudFrontUrl(doc.getProfilePath());

            String submissionUrl = null;
            if (doc.getType() == PromptType.IMAGE) {
                submissionUrl = s3Service.getCloudFrontUrl(doc.getFilePath());
            }

            return SubmissionListItem.from(doc, profileUrl, submissionUrl);
        });

        return SubmissionListRes.from(submissionItems);
    }

    @Transactional(readOnly = true)
    public SubmissionDetailRes getSubmissionDetail(Long contestId, Long submissionId, CustomUserDetails customUserDetails) {
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

        boolean isVoted = false;
        if(customUserDetails != null) {
            Member member = memberReader.getMemberById(customUserDetails.memberId());
            isVoted = voteService.isVoted(submissionId, member.getId());
        }

        return SubmissionDetailRes.from(
                submission,
                fileUrl,
                s3Service.getCloudFrontUrl(profile.getFilePath()),
                isVoted
        );
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

        String filePath = null;
        if(submission.getType() == PromptType.IMAGE) {
            SubmissionFile oldFile = submissionFileService.getSubmissionFile(submission.getId()).orElse(null);

            if(oldFile == null) {
                filePath = submissionFileService.createSubmissionFile(submission);
            } else {
                filePath = submissionFileService.updateSubmissionFile(oldFile, submissionCreateReq.result());
            }
        }

        submissionSearchRepository.updateSubmission(
                submission.getId(),
                submission.getPrompt(),
                submission.getDescription(),
                submission.getResult(),
                filePath,
                LocalDateTime.now()
        );
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
        submissionSearchRepository.deleteById(submissionId);
    }

    @Transactional(readOnly = true)
    public SubmissionDetailRes getMySubmission(Long contestId, CustomUserDetails customUserDetails) {
        Member member = memberReader.getMemberById(customUserDetails.memberId());
        Profile profile = profileReader.getProfile(member.getId());
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Submission submission = submissionRepository.findByContest_IdAndMember_Id(contestId, member.getId())
                .orElseThrow(SubmissionNotFoundException::new);

        String fileUrl = null;
        if(submission.getType() == PromptType.IMAGE) {
            SubmissionFile file = submissionFileService.getSubmissionFile(submission.getId())
                    .orElseThrow(SubmissionFileNotFoundException::new);
            fileUrl = s3Service.getCloudFrontUrl(file.getFilePath());
        }

        return SubmissionDetailRes.from(
                submission,
                fileUrl,
                s3Service.getCloudFrontUrl(profile.getFilePath()),
                voteService.isVoted(submission.getId(), member.getId())
        );
    }
}

package com.ssafy.a208.domain.contest.service;

import com.ssafy.a208.domain.contest.dto.ContestCreateReq;
import com.ssafy.a208.domain.contest.dto.ContestDetailRes;
import com.ssafy.a208.domain.contest.dto.ContestListItem;
import com.ssafy.a208.domain.contest.dto.ContestListRes;
import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.domain.contest.exception.ContestNotFoundException;
import com.ssafy.a208.domain.contest.repository.ContestRepository;
import com.ssafy.a208.domain.contest.util.ContestValidator;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.reader.ProfileReader;
import com.ssafy.a208.global.common.enums.ContestStatus;
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
public class ContestService {

    private final ContestRepository contestRepository;
    private final MemberReader memberReader;
    private final ProfileReader profileReader;

    private final S3Service s3Service;
    private final ContestValidator contestValidator;

    @Transactional
    public ContestDetailRes createContest(
            ContestCreateReq contestCreateReq,
            CustomUserDetails customUserDetails
    ) {
        Member host = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateRole(host.getRole());
        contestValidator.validateDate(true, contestCreateReq);

        PromptType type = PromptType.valueOf(contestCreateReq.type());
        LocalDateTime endAt = contestCreateReq.endAt()
                .withHour(23)
                .withMinute(59)
                .withSecond(59);
        LocalDateTime voteEndAt = contestCreateReq.voteEndAt()
                .withHour(23)
                .withMinute(59)
                .withSecond(59);

        Contest contest =  Contest.builder()
                .title(contestCreateReq.title())
                .content(contestCreateReq.content())
                .type(type)
                .startAt(contestCreateReq.startAt())
                .endAt(endAt)
                .voteEndAt(voteEndAt)
                .host(host)
                .build();

        contestRepository.save(contest);

        Profile profile = profileReader.getProfile(host.getId());

        String profileUrl =  s3Service.getCloudFrontUrl(profile.getFilePath());

        return ContestDetailRes.from(contest, profileUrl);
    }

    @Transactional(readOnly = true)
    public ContestListRes getContestList(
            int page,
            int size,
            String sorter,
            String status,
            String title
    ) {
        page = Math.max(0, page - 1);
        Sort sort = switch (sorter) {
            case "startDesc" -> Sort.by(Sort.Direction.DESC, "startAt");
            case "endDesc" -> Sort.by(Sort.Direction.DESC, "endAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
        Pageable pageable = PageRequest.of(page, size, sort);
        ContestStatus contestStatus = ContestStatus.fromName(status);

        Page<Contest> list;
        if(contestStatus == null && title.trim().isEmpty()) {
            list = contestRepository.findAll(pageable);
        } else if(contestStatus != null && title.trim().isEmpty()) {
            list = contestRepository.findByStatus(pageable, contestStatus);
        } else if(contestStatus == null) {
            list = contestRepository.findByTitleContainingIgnoreCase(pageable, title);
        } else {
            list = contestRepository.findByStatusAndTitleContainingIgnoreCase(pageable, contestStatus, title);
        }

        List<ContestListItem> contestList = list.getContent().stream()
            .map(contest -> {
                Long hostId = contest.getHost().getId();
                Profile profile = profileReader.getProfile(hostId);
                String profileUrl = (profile != null)
                    ? s3Service.getCloudFrontUrl(profile.getFilePath())
                    : null;

                return ContestListItem.from(contest, profileUrl);
            })
            .toList();

        Page<ContestListItem> contestItems = new PageImpl<>(contestList, pageable, list.getTotalElements());

        return ContestListRes.from(contestItems);
    }

    @Transactional(readOnly = true)
    public ContestDetailRes getContest(
            Long contestId
    ) {
        Contest contest = contestRepository.findById(contestId)
            .orElseThrow(ContestNotFoundException::new);
        Profile profile = profileReader.getProfile(contest.getHost().getId());
        String profileUrl =  s3Service.getCloudFrontUrl(profile.getFilePath());

        return ContestDetailRes.from(contest, profileUrl);
    }

    @Transactional
    public void updateContest(
            Long contestId,
            ContestCreateReq contestCreateReq,
            CustomUserDetails customUserDetails
    ) {
        Contest contest = contestRepository.findById(contestId)
            .orElseThrow(ContestNotFoundException::new);
        Member member = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateHost(member.getId(), contest.getHost().getId());
        contestValidator.validateRole(member.getRole());
        contestValidator.validateDate(false, contestCreateReq);

        LocalDateTime endAt = contestCreateReq.endAt()
                .withHour(23)
                .withMinute(59)
                .withSecond(59);
        LocalDateTime voteEndAt = contestCreateReq.voteEndAt()
                .withHour(23)
                .withMinute(59)
                .withSecond(59);

        contest.updateContest(
                contestCreateReq.title(),
                contestCreateReq.content(),
                contestCreateReq.startAt(),
                endAt,
                voteEndAt
        );
    }
}

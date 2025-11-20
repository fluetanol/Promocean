package com.ssafy.a208.domain.contest.service;

import com.ssafy.a208.domain.alarm.dto.AlarmReq;
import com.ssafy.a208.domain.alarm.service.AlarmService;
import com.ssafy.a208.domain.contest.dto.NoticeCreateReq;
import com.ssafy.a208.domain.contest.dto.NoticeDetailRes;
import com.ssafy.a208.domain.contest.dto.NoticeListRes;
import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.domain.contest.entity.Notice;
import com.ssafy.a208.domain.contest.exception.ContestNotFoundException;
import com.ssafy.a208.domain.contest.exception.NoticeNotFoundException;
import com.ssafy.a208.domain.contest.repository.ContestRepository;
import com.ssafy.a208.domain.contest.repository.NoticeRepository;
import com.ssafy.a208.domain.contest.repository.SubmissionRepository;
import com.ssafy.a208.domain.contest.util.ContestValidator;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.global.common.enums.AlarmCategory;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final AlarmService alarmService;
    private final NoticeRepository noticeRepository;
    private final ContestRepository contestRepository;
    private final MemberReader memberReader;
    private final SubmissionRepository submissionRepository;

    private final ContestValidator contestValidator;

    @Transactional
    public NoticeDetailRes createNotice(
            Long contestId,
            NoticeCreateReq noticeCreateReq,
            CustomUserDetails customUserDetails
    ) {
        Member author = memberReader.getMemberById(customUserDetails.memberId());
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);

        contestValidator.validateHost(author.getId(), contest.getHost().getId());
        contestValidator.validateRole(author.getRole());

        Notice notice = Notice.builder()
                .title(noticeCreateReq.title())
                .content(noticeCreateReq.content())
                .contest(contest)
                .author(author)
                .build();

        noticeRepository.save(notice);

        // 알림 전송
        AlarmReq req = AlarmReq.builder().category(AlarmCategory.CONTEST_NOTICE)
                .contestId(contestId)
                .contestTitle(contest.getTitle())
                .noticeId(notice.getId())
                .noticeTitle(notice.getTitle())
                .build();
        List<Member> members = submissionRepository.findAllMemberByContest(contestId);
        for (Member member : members) {
            alarmService.send(member, req);
        }

        return NoticeDetailRes.from(notice);
    }

    @Transactional(readOnly = true)
    public List<NoticeListRes> getNoticeList(Long contestId) {
        contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        List<Notice> noticeList = noticeRepository.findByContest_IdOrderByCreatedAtDesc(contestId);

        return noticeList.stream()
                .map(NoticeListRes::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public NoticeDetailRes getNoticeDetail(Long contestId, Long noticeId) {
        contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(NoticeNotFoundException::new);

        return NoticeDetailRes.from(notice);
    }

    @Transactional
    public void updateNotice(
            Long contestId,
            Long noticeId,
            NoticeCreateReq noticeCreateReq,
            CustomUserDetails customUserDetails
    ) {
        contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(NoticeNotFoundException::new);
        Member author = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateHost(author.getId(), notice.getAuthor().getId());
        contestValidator.validateRole(author.getRole());

        notice.updateNotice(
                noticeCreateReq.title(),
                noticeCreateReq.content()
        );
    }

    @Transactional
    public void deleteNotice(
            Long contestId,
            Long noticeId,
            CustomUserDetails customUserDetails
    ) {
        contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(NoticeNotFoundException::new);
        Member member = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateHost(member.getId(), notice.getAuthor().getId());
        contestValidator.validateRole(member.getRole());

        notice.deleteNotice();
    }
}

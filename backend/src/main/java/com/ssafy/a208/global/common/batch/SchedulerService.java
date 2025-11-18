package com.ssafy.a208.global.common.batch;

import com.ssafy.a208.domain.contest.repository.ContestRepository;
import com.ssafy.a208.domain.member.reader.MemberReader;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchedulerService {

    private final MemberReader memberReader;
    private final ContestRepository contestRepository;

    private static final int USABLE_COUNT = 5;

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void updateMemberUsableCount(){
        log.info("Usable Count 초기화작업 시작 at {}", LocalDateTime.now());

        memberReader.updateAllUsableCount(USABLE_COUNT);

        log.info("Usable Count 초기화작업 완료 at {}", LocalDateTime.now());
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void updateContestStatus(){
        log.info("대회 상태 업데이트 작업 시작 at {}", LocalDateTime.now());

        contestRepository.updateContestStatus(LocalDateTime.now());

        log.info("대회 상태 업데이트 작업 완료 at {}", LocalDateTime.now());
    }


}
package com.ssafy.a208.domain.submission.service;

import com.ssafy.a208.domain.contest.dto.SubmissionListRes;
import com.ssafy.a208.domain.contest.service.SubmissionService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class SubmissionPerformanceTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SubmissionService submissionService;

    @Test
    void getSubmissionList_perf() {
        // 1) 테스트용 더미 데이터 생성
        String sql = """
            INSERT INTO submission (
                contest_id,
                member_id,
                description,
                prompt,
                result,
                type,
                vote_count,
                created_at,
                updated_at
            )
            SELECT
                1 AS contest_id,
                1 AS member_id,
                format(
                    '테스트 참가작 %s번입니다. 이번 작품은 %s 를(을) 주제로 자유롭게 상상해 본 결과물이에요.',
                    g.i, k.kw
                ) AS description,
                format(
                    '너는 창의적인 디자이너야. %s 를(을) 주제로 %s번째 이미지 프롬프트를 만들어 줘.',
                    k.kw, g.i
                ) AS prompt,
                format(
                    '프롬프트 %s번으로 생성된 결과입니다. %s 의 분위기를 최대한 잘 살리려고 했어요.',
                    g.i, k.kw
                ) AS result,
                CASE WHEN g.i % 2 = 0 THEN 'TEXT' ELSE 'IMAGE' END AS type,
                (g.i - 1) % 50 AS vote_count,
                now() AS created_at,
                now() AS updated_at
            FROM generate_series(1, ?) AS g(i)
            JOIN (
                VALUES
                    (1, '고양이'),
                    (2, '강아지'),
                    (3, '빼빼로'),
                    (4, '빼빼로킹'),
                    (5, '크런치킹'),
                    (6, '초콜릿 과자'),
                    (7, '라면'),
                    (8, '피자'),
                    (9, '햄스터'),
                    (10, '공모전 포스터')
            ) AS k(idx, kw)
            ON ((g.i - 1) % 10) + 1 = k.idx;
            """;

        int rowCount = 100;
        jdbcTemplate.update(sql, rowCount);

        // 2) 실제로 서비스 호출해서 시간 재기
        String keyword = "고양이";
        long time = 0;
        int loop = 100;

        log.info("전체 데이터 : {}개", rowCount);
        log.info("검색 단어 : {}", keyword);

        for(int i = 0; i < loop; i++) {
            long start = System.currentTimeMillis();

            SubmissionListRes res = submissionService.getSubmissionList(
                    1L,         // contestId
                    1,          // page
                    20,         // size
                    "latest",   // sorter
                    "",         // filterAuthor
                    keyword     // filterKeyword
            );

            long end = System.currentTimeMillis();

            time += (end - start);

            if(i == 0) {
                log.info("첫 조회 소요 시간 : {} ms", (end - start));
            }
        }

        log.info("평균 소요 시간 : {} ms", time / loop);
    }
}

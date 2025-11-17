package com.ssafy.a208.domain.submission.service;

import com.ssafy.a208.domain.contest.document.SubmissionDocument;
import com.ssafy.a208.domain.contest.dto.SubmissionListRes;
import com.ssafy.a208.domain.contest.repository.SubmissionElasticsearchRepository;
import com.ssafy.a208.domain.contest.service.SubmissionService;
import com.ssafy.a208.global.common.enums.PromptType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
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

    @Autowired
    SubmissionElasticsearchRepository submissionSearchRepository;

    @Autowired
    ElasticsearchOperations operations;

    @BeforeEach
    void setUp() {
        // ES 인덱스 데이터 싹 삭제
        submissionSearchRepository.deleteAll();
        // 인덱스 refresh 해서 바로 깨끗한 상태 보장
        operations.indexOps(SubmissionDocument.class).refresh();
    }

    @AfterEach
    void tearDown() {
        // 혹시 남아있을지 모르니 한 번 더 정리
        submissionSearchRepository.deleteAll();
        operations.indexOps(SubmissionDocument.class).refresh();
    }

    @Test
    void compare_rdb_es_perf() {
        String keyword = "고양이";
        int loopCount = 100;
        int dataSize = 100;

        long rdbTime = getList_rdb(keyword, loopCount, dataSize);
        long esTime = getList_es(keyword, loopCount, dataSize);

        log.info("rdb time: {}ms", rdbTime);
        log.info("es time: {}ms", esTime);
    }

    long getList_rdb(String keyword, int loopCount, int dataSize) {
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

        jdbcTemplate.update(sql, dataSize);

        // 2) 실제로 서비스 호출해서 시간 재기
        long time = 0;

        for(int i = 0; i < loopCount; i++) {
            long start = System.currentTimeMillis();

            SubmissionListRes res = submissionService.getSubmissionListLegacy(
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
                log.info("RDB 첫 조회 소요 시간 : {} ms", (end - start));
                log.info("RDB 첫 조회 결과 개수 : {}", res.itemCnt());
            }
        }

        return time / loopCount;
    }

    long getList_es(String keyword, int loopCount, int dataSize) {
        // 1) ES용 더미 도큐먼트 생성 & 저장
        List<String> keywords = List.of(
                "고양이",
                "강아지",
                "빼빼로",
                "빼빼로킹",
                "크런치킹",
                "초콜릿 과자",
                "라면",
                "피자",
                "햄스터",
                "공모전 포스터"
        );

        List<SubmissionDocument> docs = IntStream.rangeClosed(1, dataSize)
                .mapToObj(i -> {
                    String kw = keywords.get((i - 1) % keywords.size());
                    PromptType type = (i % 2 == 0) ? PromptType.TEXT : PromptType.IMAGE;

                    return SubmissionDocument.builder()
                            .id((long) i) // 테스트니까 그냥 1..N 부여
                            .prompt(String.format(
                                    "너는 창의적인 디자이너야. %s 를(을) 주제로 %d번째 이미지 프롬프트를 만들어 줘.",
                                    kw, i
                            ))
                            .description(String.format(
                                    "테스트 참가작 %d번입니다. 이번 작품은 %s 를(을) 주제로 자유롭게 상상해 본 결과물이에요.",
                                    i, kw
                            ))
                            .result(String.format(
                                    "프롬프트 %d번으로 생성된 결과입니다. %s 의 분위기를 최대한 잘 살리려고 했어요.",
                                    i, kw
                            ))
                            .type(type)
                            .voteCount((i - 1) % 50)
                            .filePath(type == PromptType.IMAGE ? "images/submission-%d.png".formatted(i) : null)
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .contestId(1L)          // 서비스에서 contestId=1로 조회하니까 맞춰줌
                            .memberId(1L)
                            .memberNickname("테스트유저")
                            .profilePath("profiles/test-user.png")
                            .build();
                })
                .toList();

        submissionSearchRepository.saveAll(docs);
        // 방금 인덱싱한 문서들이 검색에 바로 잡히도록 refresh
        operations.indexOps(SubmissionDocument.class).refresh();

        // 2) 실제 서비스 호출해서 시간 재기
        long time = 0;

        for (int i = 0; i < loopCount; i++) {
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

            if (i == 0) {
                log.info("ES 첫 조회 소요 시간 : {} ms", (end - start));
                log.info("ES 첫 조회 결과 개수 : {}", res.itemCnt());
            }
        }

        return time / loopCount;
    }
}

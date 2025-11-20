package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.config.HibernateQueryCounter;
import com.ssafy.a208.domain.board.dto.PostListQueryDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@SpringBootTest
@ActiveProfiles("test")
public class PostServicePerformanceTestSimple {

    @Autowired
    private PostService postService;

    @Autowired
    private HibernateQueryCounter queryCounter;

    @Test
    @DisplayName("최종 비교: V1(Entity) vs V2(FetchJoin) vs V3(Projection)")
    void finalThreeWayComparisonWithMemory() {
        PostListQueryDto query = new PostListQueryDto(
                1, 20, null, null, null, "latest", null, null
        );

        System.out.println("\n" + "=".repeat(80));
        System.out.println("🔥 3단계 성능 비교: Entity → FetchJoin → Projection (메모리 포함)");
        System.out.println("=".repeat(80) + "\n");

        // ========== V1: Entity 조회 (N+1 문제) ==========
        System.out.println("📍 V1 측정 중 (Entity - N+1 문제)...");

        // Warm up
        for (int i = 0; i < 5; i++) {
            postService.getPostsV1(query);
        }

        // 가비지 컬렉션
        System.gc();
        try { Thread.sleep(100); } catch (InterruptedException e) {}

        queryCounter.start();
        long v1MemoryBefore = getUsedMemory();

        List<Long> v1Times = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            long start = System.nanoTime();
            postService.getPostsV1(query);
            long end = System.nanoTime();
            v1Times.add((end - start) / 1_000_000);
        }

        long v1MemoryAfter = getUsedMemory();
        long v1MemoryUsed = (v1MemoryAfter - v1MemoryBefore) / 10; // 평균
        long v1QueryCount = queryCounter.getQueryCount() / 10;

        double v1Avg = v1Times.stream().mapToLong(Long::longValue).average().orElse(0);
        long v1Min = v1Times.stream().mapToLong(Long::longValue).min().orElse(0);
        long v1Max = v1Times.stream().mapToLong(Long::longValue).max().orElse(0);

        // ========== V2: FetchJoin (현재 버전) ==========
        System.out.println("📍 V2 측정 중 (FetchJoin)...");

        // Warm up
        for (int i = 0; i < 5; i++) {
            postService.getPostsV2(query);
        }

        // 가비지 컬렉션
        System.gc();
        try { Thread.sleep(100); } catch (InterruptedException e) {}

        queryCounter.start();
        long v2MemoryBefore = getUsedMemory();

        List<Long> v2Times = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            long start = System.nanoTime();
            postService.getPostsV2(query);
            long end = System.nanoTime();
            v2Times.add((end - start) / 1_000_000);
        }

        long v2MemoryAfter = getUsedMemory();
        long v2MemoryUsed = (v2MemoryAfter - v2MemoryBefore) / 10; // 평균
        long v2QueryCount = queryCounter.getQueryCount() / 10;

        double v2Avg = v2Times.stream().mapToLong(Long::longValue).average().orElse(0);
        long v2Min = v2Times.stream().mapToLong(Long::longValue).min().orElse(0);
        long v2Max = v2Times.stream().mapToLong(Long::longValue).max().orElse(0);

        // ========== V3: Projection (최종 개선) ==========
        System.out.println("📍 V3 측정 중 (Projection)...");

        // Warm up
        for (int i = 0; i < 5; i++) {
            postService.getPostsV3(query);
        }

        // 가비지 컬렉션
        System.gc();
        try { Thread.sleep(100); } catch (InterruptedException e) {}

        queryCounter.start();
        long v3MemoryBefore = getUsedMemory();

        List<Long> v3Times = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            long start = System.nanoTime();
            postService.getPostsV3(query);
            long end = System.nanoTime();
            v3Times.add((end - start) / 1_000_000);
        }

        long v3MemoryAfter = getUsedMemory();
        long v3MemoryUsed = (v3MemoryAfter - v3MemoryBefore) / 10; // 평균
        long v3QueryCount = queryCounter.getQueryCount() / 10;

        double v3Avg = v3Times.stream().mapToLong(Long::longValue).average().orElse(0);
        long v3Min = v3Times.stream().mapToLong(Long::longValue).min().orElse(0);
        long v3Max = v3Times.stream().mapToLong(Long::longValue).max().orElse(0);

        System.out.println("✅ 측정 완료\n");

        // ========== 결과 출력 ==========
        double timeImprove1to2 = ((v1Avg - v2Avg) / v1Avg) * 100;
        double timeImprove2to3 = ((v2Avg - v3Avg) / v2Avg) * 100;
        double timeImprove1to3 = ((v1Avg - v3Avg) / v1Avg) * 100;

        double memImprove1to2 = ((v1MemoryUsed - v2MemoryUsed) / (double) v1MemoryUsed) * 100;
        double memImprove2to3 = ((v2MemoryUsed - v3MemoryUsed) / (double) v2MemoryUsed) * 100;
        double memImprove1to3 = ((v1MemoryUsed - v3MemoryUsed) / (double) v1MemoryUsed) * 100;

        System.out.println("=".repeat(80));
        System.out.println("📊 3단계 성능 비교 결과 (메모리 포함)");
        System.out.println("=".repeat(80));

        System.out.println("\n【V1: Entity 조회 (개선 전)】");
        System.out.println(String.format("  실행시간: 평균 %.2fms | 최소 %dms | 최대 %dms", v1Avg, v1Min, v1Max));
        System.out.println(String.format("  메모리 사용: %s", formatMemory(v1MemoryUsed)));
        System.out.println(String.format("  쿼리 수: %d개 (N+1 문제)", v1QueryCount));

        System.out.println("\n【V2: FetchJoin (1차 개선)】");
        System.out.println(String.format("  실행시간: 평균 %.2fms | 최소 %dms | 최대 %dms", v2Avg, v2Min, v2Max));
        System.out.println(String.format("  메모리 사용: %s", formatMemory(v2MemoryUsed)));
        System.out.println(String.format("  쿼리 수: %d개", v2QueryCount));
        System.out.println(String.format("  개선율: 시간 %.1f%% | 메모리 %.1f%% (V1 대비)", timeImprove1to2, memImprove1to2));

        System.out.println("\n【V3: Projection (최종 개선)】");
        System.out.println(String.format("  실행시간: 평균 %.2fms | 최소 %dms | 최대 %dms", v3Avg, v3Min, v3Max));
        System.out.println(String.format("  메모리 사용: %s", formatMemory(v3MemoryUsed)));
        System.out.println(String.format("  쿼리 수: %d개", v3QueryCount));
        System.out.println(String.format("  개선율: 시간 %.1f%% | 메모리 %.1f%% (V2 대비)", timeImprove2to3, memImprove2to3));
        System.out.println(String.format("           시간 %.1f%% | 메모리 %.1f%% (V1 대비)", timeImprove1to3, memImprove1to3));

        System.out.println("\n" + "-".repeat(80));
        System.out.println("【최종 개선 효과 (V1 → V3)】");
        System.out.println(String.format("  ✅ 응답 시간: %.1f%% 개선 (%.2fms → %.2fms)", timeImprove1to3, v1Avg, v3Avg));
        System.out.println(String.format("  ✅ 메모리 사용: %.1f%% 개선 (%s → %s)", memImprove1to3,
                formatMemory(v1MemoryUsed), formatMemory(v3MemoryUsed)));
        System.out.println(String.format("  ✅ 쿼리 수: %.1f%% 감소 (%d개 → %d개)",
                ((v1QueryCount - v3QueryCount) / (double) v1QueryCount) * 100, v1QueryCount, v3QueryCount));
        System.out.println("=".repeat(80) + "\n");
    }

    @Test
    @DisplayName("🎯 최종 비교: V1 vs V2 vs V3 (시간만)")
    void finalThreeWayComparison() {
        PostListQueryDto query = new PostListQueryDto(
                1, 20, null, null, null, "latest", null, null
        );

        System.out.println("\n" + "=".repeat(80));
        System.out.println("🔥 3단계 성능 비교: Entity → FetchJoin → Projection");
        System.out.println("=".repeat(80) + "\n");

        // ========== V1: Entity 조회 (N+1 문제) ==========
        System.out.println("📍 V1 측정 중 (Entity - N+1 문제)...");

        // Warm up
        for (int i = 0; i < 5; i++) {
            postService.getPostsV1(query);
        }

        queryCounter.start();
        List<Long> v1Times = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            long start = System.nanoTime();
            postService.getPostsV1(query);
            long end = System.nanoTime();
            v1Times.add((end - start) / 1_000_000);
        }
        long v1QueryCount = queryCounter.getQueryCount() / 10;

        double v1Avg = v1Times.stream().mapToLong(Long::longValue).average().orElse(0);
        long v1Min = v1Times.stream().mapToLong(Long::longValue).min().orElse(0);
        long v1Max = v1Times.stream().mapToLong(Long::longValue).max().orElse(0);

        // ========== V2: FetchJoin (현재 버전) ==========
        System.out.println("📍 V2 측정 중 (FetchJoin)...");

        // Warm up
        for (int i = 0; i < 5; i++) {
            postService.getPostsV2(query);
        }

        queryCounter.start();
        List<Long> v2Times = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            long start = System.nanoTime();
            postService.getPostsV2(query);
            long end = System.nanoTime();
            v2Times.add((end - start) / 1_000_000);
        }
        long v2QueryCount = queryCounter.getQueryCount() / 10;

        double v2Avg = v2Times.stream().mapToLong(Long::longValue).average().orElse(0);
        long v2Min = v2Times.stream().mapToLong(Long::longValue).min().orElse(0);
        long v2Max = v2Times.stream().mapToLong(Long::longValue).max().orElse(0);

        // ========== V3: Projection (최종 개선) ==========
        System.out.println("📍 V3 측정 중 (Projection)...");

        // Warm up
        for (int i = 0; i < 5; i++) {
            postService.getPostsV3(query);
        }

        queryCounter.start();
        List<Long> v3Times = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            long start = System.nanoTime();
            postService.getPostsV3(query);
            long end = System.nanoTime();
            v3Times.add((end - start) / 1_000_000);
        }
        long v3QueryCount = queryCounter.getQueryCount() / 10;

        double v3Avg = v3Times.stream().mapToLong(Long::longValue).average().orElse(0);
        long v3Min = v3Times.stream().mapToLong(Long::longValue).min().orElse(0);
        long v3Max = v3Times.stream().mapToLong(Long::longValue).max().orElse(0);

        System.out.println("✅ 측정 완료\n");

        // ========== 결과 출력 ==========
        double improve1to2 = ((v1Avg - v2Avg) / v1Avg) * 100;
        double improve2to3 = ((v2Avg - v3Avg) / v2Avg) * 100;
        double improve1to3 = ((v1Avg - v3Avg) / v1Avg) * 100;

        System.out.println("=".repeat(80));
        System.out.println("📊 3단계 성능 비교 결과");
        System.out.println("=".repeat(80));

        System.out.println("\n【V1: Entity 조회 (개선 전)】");
        System.out.println(String.format("  실행시간: 평균 %.2fms | 최소 %dms | 최대 %dms", v1Avg, v1Min, v1Max));
        System.out.println(String.format("  쿼리 수: %d개 (N+1 문제)", v1QueryCount));

        System.out.println("\n【V2: FetchJoin (1차 개선)】");
        System.out.println(String.format("  실행시간: 평균 %.2fms | 최소 %dms | 최대 %dms", v2Avg, v2Min, v2Max));
        System.out.println(String.format("  쿼리 수: %d개", v2QueryCount));
        System.out.println(String.format("  개선율: %.1f%% (V1 대비)", improve1to2));

        System.out.println("\n【V3: Projection (최종 개선)】");
        System.out.println(String.format("  실행시간: 평균 %.2fms | 최소 %dms | 최대 %dms", v3Avg, v3Min, v3Max));
        System.out.println(String.format("  쿼리 수: %d개", v3QueryCount));
        System.out.println(String.format("  개선율: %.1f%% (V2 대비) / %.1f%% (V1 대비)", improve2to3, improve1to3));

        System.out.println("\n" + "-".repeat(80));
        System.out.println("【최종 개선 효과 (V1 → V3)】");
        System.out.println(String.format("  ✅ 응답 시간: %.1f%% 개선", improve1to3));
        System.out.println(String.format("  ✅ 쿼리 수: %d개 → %d개 (%.1f%% 감소)",
                v1QueryCount, v3QueryCount, ((v1QueryCount - v3QueryCount) / (double) v1QueryCount) * 100));
        System.out.println("=".repeat(80) + "\n");
    }

    /**
     * 현재 사용 중인 메모리 (bytes)
     */
    private long getUsedMemory() {
        Runtime runtime = Runtime.getRuntime();
        return runtime.totalMemory() - runtime.freeMemory();
    }

    /**
     * 메모리 포맷팅 (KB, MB, GB)
     */
    private String formatMemory(long bytes) {
        if (bytes < 1024) {
            return bytes + " B";
        } else if (bytes < 1024 * 1024) {
            return String.format("%.2f KB", bytes / 1024.0);
        } else if (bytes < 1024 * 1024 * 1024) {
            return String.format("%.2f MB", bytes / (1024.0 * 1024));
        } else {
            return String.format("%.2f GB", bytes / (1024.0 * 1024 * 1024));
        }
    }
}
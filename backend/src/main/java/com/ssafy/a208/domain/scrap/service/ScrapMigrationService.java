package com.ssafy.a208.domain.scrap.service;

import com.ssafy.a208.domain.scrap.entity.Scrap;
import com.ssafy.a208.domain.scrap.repository.ScrapRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScrapMigrationService {

    private final ScrapRepository scrapRepository;
    private final ScrapIndexService scrapIndexService;

    @Transactional(readOnly = true)
    public void migrateAllScrapsToElasticsearch() {
        int pageSize = 100;
        int pageNumber = 0;
        long totalMigrated = 0;

        long totalCount = scrapRepository.count();
        log.info("스크랩 ES 마이그레이션 시작 - 총 {} 건", totalCount);

        while (true) {
            Page<Scrap> scrapPage = scrapRepository.findAll(PageRequest.of(pageNumber, pageSize));

            if (scrapPage.isEmpty()) {
                break;
            }

            scrapPage.getContent().forEach(scrap -> {
                if (scrap.getDeletedAt() == null) {
                    try {
                        scrapIndexService.indexScrap(scrap);
                    } catch (Exception e) {
                        log.error("스크랩 인덱싱 실패 - scrapId: {}", scrap.getId(), e);
                    }
                }
            });

            totalMigrated += scrapPage.getNumberOfElements();
            pageNumber++;

        }

        log.info("스크랩 ES 마이그레이션 완료 - 총 {} 건", totalMigrated);
    }
}
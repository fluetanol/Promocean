package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.repository.ArticleRepository;
import com.ssafy.a208.domain.tag.service.ArticleTagService;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleMigrationService {

    private final ArticleTagService articleTagService;
    private final ArticleFileService articleFileService;
    private final ArticleRepository articleRepository;
    private final ArticleElasticSearchService articleElasticSearchService;

    @Transactional(readOnly = true)
    public void migrateAllArticlesToElasticsearch() {
        int pageSize = 100;
        int pageNumber = 0;
        long totalMigrated = 0;

        long totalCount = articleRepository.count();
        log.info("아티클 ES 마이그레이션 시작 - 총 {}건", totalCount);

        while (true) {
            Page<Article> articlePage = articleRepository.findAllByDeletedAtIsNull(
                    PageRequest.of(pageNumber, pageSize));

            if (articlePage.isEmpty()) {
                break;
            }

            articlePage.getContent().forEach(article -> {
                try {
                    String filePath = articleFileService.getArticleFilePath(article);
                    Set<String> tags = new HashSet<>(articleTagService.getTagNames(article));
                    articleElasticSearchService.indexArticle(article, filePath, tags);
                } catch (Exception e) {
                    log.error("아티클 인덱싱 실패 - articleId: {}", article.getId(), e);
                }
            });

            totalMigrated += articlePage.getNumberOfElements();
            pageNumber++;

            double progress = (totalMigrated * 100.0) / totalCount;
            log.info("마이그레이션 진행중 - {}/{} 건 ({:.1f}%)", totalMigrated, totalCount, progress);
        }

        log.info("아티클 ES 마이그레이션 완료 - 총 {} 건", totalMigrated);
    }

}

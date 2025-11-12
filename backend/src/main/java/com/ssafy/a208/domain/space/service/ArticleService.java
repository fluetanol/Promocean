package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.dto.request.ArticleReq;
import com.ssafy.a208.domain.space.dto.response.ArticleDetailRes;
import com.ssafy.a208.domain.space.dto.response.ArticleInfo;
import com.ssafy.a208.domain.space.dto.response.ArticleListItemQueryRes;
import com.ssafy.a208.domain.space.dto.response.ArticleListRes;
import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.Folder;
import com.ssafy.a208.domain.space.exception.InvalidArticleRequestException;
import com.ssafy.a208.domain.space.reader.ArticleReader;
import com.ssafy.a208.domain.space.repository.ArticleRepository;
import com.ssafy.a208.domain.tag.service.ArticleTagService;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.common.enums.SortType;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final SpaceService spaceService;
    private final ArticleReader articleReader;
    private final FolderService folderService;
    private final ArticleTagService articleTagService;
    private final ArticleRepository articleRepository;
    private final ArticleFileService articleFileService;
    private final ArticleElasticSearchService articleElasticSearchService;

    @Transactional
    public ArticleDetailRes createArticle(CustomUserDetails userDetails, Long spaceId,
            Long folderId, ArticleReq articleReq) {
        Folder folder = folderService.getEditableFolder(spaceId, folderId, userDetails.memberId());
        validateArticleRequest(articleReq);

        Article article = saveArticle(articleReq, folder);
        articleTagService.createArticleTag(articleReq.tags(), article);
        String fileUrl = articleFileService.createArticleFile(articleReq.filePath(), article);

        articleElasticSearchService.indexArticle(article, fileUrl, articleReq.tags());

        return ArticleDetailRes.builder()
                .articleId(article.getId())
                .title(article.getTitle())
                .description(article.getDescription())
                .prompt(article.getPrompt())
                .type(article.getType().getName())
                .sampleQuestion(article.getExampleQuestion())
                .sampleAnswer(article.getExampleAnswer())
                .fileUrl(fileUrl)
                .tags(articleReq.tags().stream().toList())
                .updatedAt(article.getUpdatedAt())
                .build();
    }

    @Transactional
    public void updateArticle(CustomUserDetails userDetails, Long spaceId, Long folderId,
            Long articleId, ArticleReq articleReq) {
        folderService.validateEditableFolder(spaceId, folderId, userDetails.memberId());
        validateArticleRequest(articleReq);
        Article article = articleReader.getArticleById(articleId);

        // 해시태그 처리
        articleTagService.updateArticleTags(articleReq.tags(), article);

        // 이미지에서 텍스트로 바뀌는 경우 이미지 삭제
        if (articleReq.type() == PromptType.TEXT.getValue()
                && article.getType().getValue() == PromptType.IMAGE.getValue()) {
            articleFileService.deleteArticleFile(article);
        }

        // 파일 들어왔으면 고쳐주기
        articleFileService.updateArticleFile(articleReq.filePath(), article);

        article.updateArticle(articleReq.title(), articleReq.description(), articleReq.prompt(),
                PromptType.valueOf(articleReq.type()), articleReq.exampleQuestion(),
                articleReq.exampleAnswer());

        articleElasticSearchService.indexArticle(article, articleReq.filePath(), articleReq.tags());

    }

    @Transactional
    public void deleteArticle(CustomUserDetails userDetails, Long spaceId, Long folderId,
            Long articleId) {
        folderService.validateEditableFolder(spaceId, folderId, userDetails.memberId());
        Article article = articleReader.getArticleById(articleId);
        articleFileService.deleteArticleFile(article);

        article.deleteArticle();
        articleTagService.deleteArticleTag(article);
        articleElasticSearchService.deleteArticle(article.getId());
    }

    @Transactional(readOnly = true)
    public ArticleListRes getArticleList(CustomUserDetails userDetails, Long spaceId,
            Long folderId, Integer type, String tag, String title, int page, int size,
            SortType sort) {
        if (Objects.isNull(folderId)) {
            spaceService.validateEditableSpace(spaceId, userDetails.memberId());
        } else {
            folderService.validateEditableFolder(spaceId, folderId, userDetails.memberId());
        }

        Page<ArticleListItemQueryRes> articles = articleElasticSearchService
                .getArticles(folderId, title, tag, type, sort, page, size);

        List<ArticleInfo> articleInfos = articles.stream()
                .map(article -> ArticleInfo.builder()
                        .articleId(article.articleId())
                        .title(article.title())
                        .type(article.type().getName())
                        .fileUrl(articleFileService.getArticleFileUrlByString(article.filePath()))
                        .tags(article.tags())
                        .updatedAt(article.updatedAt())
                        .build()).toList();

        return ArticleListRes.builder()
                .articles(articleInfos)
                .currentCnt(articles.getNumberOfElements())
                .currentPage(articles.getNumber() + 1)
                .totalCnt(articles.getTotalElements())
                .totalPage(articles.getTotalPages())
                .build();
    }

    @Transactional(readOnly = true)
    public ArticleDetailRes getArticleDetail(CustomUserDetails userDetails, Long spaceId,
            Long articleId) {
        spaceService.validateEditableSpace(spaceId, userDetails.memberId());
        Article article = articleReader.getArticleById(articleId);
        String fileUrl = articleFileService.getArticleFileUrl(article);

        return ArticleDetailRes.builder()
                .articleId(article.getId())
                .title(article.getTitle())
                .description(article.getDescription())
                .prompt(article.getPrompt())
                .type(article.getType().getName())
                .fileUrl(fileUrl)
                .sampleQuestion(article.getExampleQuestion())
                .sampleAnswer(article.getExampleAnswer())
                .updatedAt(article.getUpdatedAt())
                .tags(articleTagService.getTagNames(article))
                .build();
    }

    private Article saveArticle(ArticleReq articleReq, Folder folder) {
        Article article = Article.builder()
                .title(articleReq.title())
                .description(articleReq.description())
                .prompt(articleReq.prompt())
                .type(PromptType.valueOf(articleReq.type()))
                .exampleQuestion(articleReq.exampleQuestion())
                .exampleAnswer(articleReq.exampleAnswer())
                .folder(folder)
                .build();
        return articleRepository.save(article);
    }


    private void validateArticleRequest(ArticleReq articleReq) {
        if (Objects.equals(articleReq.type(), 1)) { // TEXT
            if (!Objects.isNull(articleReq.filePath()) && !articleReq.filePath().isBlank()) {
                throw new InvalidArticleRequestException();
            }
        } else if (Objects.equals(articleReq.type(), 2)) { // IMAGE
            if ((!Objects.isNull(articleReq.exampleQuestion()) && !articleReq.exampleQuestion()
                    .isBlank())
                    || (!Objects.isNull(articleReq.exampleAnswer()) && !articleReq.exampleAnswer()
                    .isBlank())) {
                throw new InvalidArticleRequestException();
            }
        }
    }
}

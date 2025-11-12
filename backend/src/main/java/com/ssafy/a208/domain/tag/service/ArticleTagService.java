package com.ssafy.a208.domain.tag.service;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.tag.entity.ArticleTag;
import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.reader.ArticleTagReader;
import com.ssafy.a208.domain.tag.reader.TagReader;
import com.ssafy.a208.domain.tag.repository.ArticleTagRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleTagService {

    private final TagReader tagReader;
    private final TagService tagService;
    private final ArticleTagReader articleTagReader;
    private final ArticleTagRepository articleTagRepository;
    private final TagIndexService tagIndexService;

    @Transactional
    public void createArticleTag(Set<String> tags, Article article) {
        for (String name : tags) {
            Optional<Tag> tag = tagReader.getTagByName(name);

            tag.ifPresentOrElse(
                    existing -> {
                        saveNewArticleTag(existing, article);
                        tagIndexService.updateTagUsageCount(existing.getId());
                    },
                    () -> {
                        Tag newTag = tagService.createTag(name);
                        saveNewArticleTag(newTag, article);
                        tagIndexService.indexTag(newTag);
                    }
            );
        }
    }

    @Transactional
    public void updateArticleTags(Set<String> tags, Article article) {
        List<ArticleTag> articleTags = articleTagReader.getArticleTag(article);

        Set<String> oldTags = new HashSet<>();
        for (ArticleTag tag : articleTags) {
            if (tags.contains(tag.getTag().getName())) {
                oldTags.add(tag.getTag().getName());
            }
            articleTagRepository.delete(tag);
            tagIndexService.updateTagUsageCount(tag.getTag().getId());
        }

        tags.removeAll(oldTags);
        createArticleTag(tags, article);
    }

    public List<String> getTagNames(Article article) {
        List<ArticleTag> articleTags = articleTagReader.getArticleTag(article);
        List<String> tags = new ArrayList<>();
        for (ArticleTag articleTag : articleTags) {
            tags.add(articleTag.getTag().getName());
        }
        return tags;
    }

    public void deleteArticleTag(Article article) {
        List<ArticleTag> articleTags = articleTagReader.getArticleTag(article);
        for (ArticleTag articleTag : articleTags) {
            articleTagRepository.delete(articleTag);
            tagIndexService.updateTagUsageCount(articleTag.getTag().getId());
        }
    }

    private void saveNewArticleTag(Tag tag, Article article) {
        articleTagRepository.save(ArticleTag.builder()
                .tag(tag)
                .article(article)
                .build());
    }
}

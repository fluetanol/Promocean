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
import java.util.stream.Collectors;
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
        List<ArticleTag> articleTags = articleTagReader.getArticleTag(article); // 원래 태그

        Set<String> existingTagNames = articleTags.stream()
                .map(at -> at.getTag().getName())
                .collect(Collectors.toSet());

        Set<String> tagsToDelete = new HashSet<>(existingTagNames);
        tagsToDelete.removeAll(tags);

        Set<String> tagsToAdd = new HashSet<>(tags);
        tagsToAdd.removeAll(existingTagNames);

        for (ArticleTag tag : articleTags) {
            if (tagsToDelete.contains(tag.getTag().getName())) {
                articleTagRepository.delete(tag);
                tagIndexService.updateTagUsageCount(tag.getTag().getId());
            }
        }

        createArticleTag(tagsToAdd, article);
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

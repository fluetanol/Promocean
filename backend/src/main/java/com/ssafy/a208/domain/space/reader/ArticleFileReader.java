package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.ArticleFile;
import com.ssafy.a208.domain.space.repository.ArticleFileRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleFileReader {

    private final ArticleFileRepository articleFileRepository;

    public Optional<ArticleFile> getArticleFileById(Long articleId) {
        return articleFileRepository.findByArticleIdAndDeletedAtIsNull(articleId);
    }
}

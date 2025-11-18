package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.ArticleFile;
import com.ssafy.a208.domain.space.reader.ArticleFileReader;
import com.ssafy.a208.domain.space.repository.ArticleFileRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleFileService {

    private final S3Service s3Service;
    private final ArticleFileReader articleFileReader;
    private final ArticleFileRepository articleFileRepository;

    public String createArticleFile(String filePath, Article article) {
        if (Objects.isNull(filePath) || filePath.isBlank()) {
            return null;
        }

        String destPath = extractFilePath(filePath);
        FileMetaData metaData = s3Service.getFileMetadata(destPath);
        ArticleFile articleFile = ArticleFile.builder()
                .originalName(metaData.originalName())
                .filePath(metaData.filePath())
                .size(metaData.size())
                .contentType(metaData.contentType())
                .article(article)
                .build();
        articleFileRepository.save(articleFile);

        return destPath;
    }

    public void deleteArticleFile(Article article) {
        Optional<ArticleFile> articleFile = articleFileReader.getArticleFileById(article.getId());
        articleFile.ifPresent(existing -> {
            s3Service.deleteFile(existing.getFilePath());
            existing.deleteArticleFile();
        });
    }

    public String getArticleFileUrl(Article article) {
        String filePath = getArticleFilePath(article);
        if (Objects.isNull(filePath)) {
            return null;
        }

        return s3Service.getCloudFrontUrl(filePath);
    }

    public String getArticleFilePath(Article article) {
        Optional<ArticleFile> articleFile = articleFileReader.getArticleFileById(article.getId());

        return articleFile
                .map(existing -> existing.getFilePath())
                .orElse(null);
    }

    public String getArticleFileUrlByString(String filePath) {
        if (Objects.isNull(filePath) || filePath.isBlank()) {
            return null;
        }
        return s3Service.getCloudFrontUrl(filePath);
    }

    public String updateArticleFile(String filePath, Article article) {
        if (Objects.isNull(filePath) && filePath.isBlank()) {
            return null;
        }

        // 기존 파일이 들어온 경우, 기존 파일 반환
        if (filePath.startsWith(ImageDirectory.ARTICLES.getName())) {
            return filePath;
        }

        Optional<ArticleFile> file = articleFileReader.getArticleFileById(article.getId());
        if (file.isPresent()) {
            ArticleFile existing = file.get();
            String destPath = extractFilePath(filePath);
            FileMetaData metaData = s3Service.getFileMetadata(destPath);
            existing.updateFile(metaData);
            s3Service.deleteFile(existing.getFilePath());
            return destPath;
        }

        return createArticleFile(filePath, article);
    }

    private String extractFilePath(String filePath) {
        if (!filePath.startsWith("tmp")) {
            throw new InvalidFilePathException();
        }

        return s3Service.moveObject(filePath, ImageDirectory.ARTICLES);
    }

}

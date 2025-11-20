package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostFile;
import com.ssafy.a208.domain.board.exception.InvalidPostRequestException;
import com.ssafy.a208.domain.board.reader.PostFileReader;
import com.ssafy.a208.domain.board.repository.PostFileRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

/**
 * 게시글 파일 관련 서비스
 * 파일 생성, 수정, 삭제를 담당합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PostFileService {

    private final S3Service s3Service;
    private final PostFileRepository postFileRepository;
    private final PostFileReader postFileReader;

    /**
     * 게시글 파일을 생성합니다.
     *
     * @param filePath 파일 경로
     * @param post 게시글 엔티티
     * @return 파일 경로
     */
    @Transactional
    public String createPostFile(String filePath, Post post) {
        String destPath = extractFilePath(filePath);
        FileMetaData metaData = s3Service.getFileMetadata(destPath);

        PostFile postFile = PostFile.builder()
                .originalName(metaData.originalName())
                .filePath(metaData.filePath())
                .size(metaData.size())
                .contentType(metaData.contentType())
                .post(post)
                .build();

        postFileRepository.save(postFile);

        log.info("게시글 파일 생성 완료 - postId: {}, filePath: {}", post.getId(), destPath);

        return destPath;
    }

    /**
     * 게시글 파일을 업데이트합니다.
     * 기존 파일이 있으면 삭제 후 새 파일로 교체하고, 없으면 새로 생성합니다.
     *
     * @param post 게시글 엔티티
     * @param newFilePath 새로운 파일 경로
     */
    @Transactional
    public String updatePostFile(Post post, String newFilePath) {
        Optional<PostFile> existingFileOptional = postFileReader.getPostFileByPost(post);

        // 기존 파일 경로와 동일한지 확인
        boolean isSameFile = existingFileOptional
                .map(existing -> existing.getFilePath().equals(newFilePath))
                .orElse(false);

        if (isSameFile) {
            // 기존 파일과 동일 -> 변경 없음
            log.info("기존 파일 유지 - postId: {}, filePath: {}", post.getId(), newFilePath);
            return newFilePath;
        }

        // 새 파일로 변경
        // tmp 검증과 이동
        String destPath = extractFilePath(newFilePath);

        existingFileOptional.ifPresentOrElse(
                existingFile -> {
                    // 기존 S3 파일 삭제
                    s3Service.deleteFile(existingFile.getFilePath());

                    // 새 파일 메타데이터로 교체
                    FileMetaData metaData = s3Service.getFileMetadata(destPath);
                    // DB 업데이트
                    existingFile.updateFile(metaData);

                    log.info("게시글 파일 수정 완료 - postId: {}, filePath: {}", post.getId(), destPath);
                },
                () -> createPostFile(newFilePath, post)
        );
        return destPath;
    }

    /**
     * 게시글 파일을 삭제합니다.
     *
     * @param postFile 삭제할 PostFile 엔티티
     */
    @Transactional
    public void deletePostFile(PostFile postFile) {
        s3Service.deleteFile(postFile.getFilePath());
        postFile.deletePostFile();
        log.info("게시글 파일 삭제 완료 - filePath: {}", postFile.getFilePath());
    }

    /**
     *  tmp/ 경로 검증 및 파일 이동을 담당하는 헬퍼 메서드입니다.
     * - S3Service.moveObject 호출 시 posts 디렉토리로 이동
     * @param filePath 원본 파일 경로
     * @return 이동된 파일의 최종 경로
     */
    private String extractFilePath(String filePath) {
        if (!filePath.startsWith("tmp/")) {
            throw new InvalidFilePathException();
        }
        return s3Service.moveObject(filePath, ImageDirectory.POSTS);
    }
}
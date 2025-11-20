package com.ssafy.a208.domain.board.reader;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostFile;
import com.ssafy.a208.domain.board.repository.PostFileRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * PostFile 조회 전용 Reader 클래스.
 * - 삭제되지 않은 파일만 반환합니다.
 */
@Component
@RequiredArgsConstructor
public class PostFileReader {

    private final PostFileRepository postFileRepository;

    /**
     * 게시글에 연결된 파일 조회
     * @param post 게시글 엔티티
     * @return 삭제되지 않은 PostFile
     */
    public Optional<PostFile> getPostFileByPost(Post post) {
        return postFileRepository.findByPostAndDeletedAtIsNull(post);
    }
}
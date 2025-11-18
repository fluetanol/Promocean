package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.document.PostDocument;
import com.ssafy.a208.domain.board.dto.*;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.exception.InvalidPostRequestException;
import com.ssafy.a208.domain.board.exception.PostNotFoundException;
import com.ssafy.a208.domain.board.exception.PostAccessDeniedException;
import com.ssafy.a208.domain.board.reader.PostFileReader;
import com.ssafy.a208.domain.board.reader.PostLikeReader;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.board.reader.ReplyReader;
import com.ssafy.a208.domain.board.repository.PostElasticsearchRepositoryImpl;
import com.ssafy.a208.domain.board.repository.PostRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.scrap.reader.ScrapReader;
import com.ssafy.a208.domain.scrap.service.ScrapService;
import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.domain.tag.service.PostTagService;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 게시글 서비스
 * 게시글 생성, 수정 등 핵심 비즈니스 로직을 담당합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final MemberReader memberReader;
    private final PostFileReader postFileReader;
    private final PostReader postReader;
    private final PostLikeReader postLikeReader;
    private final ReplyReader replyReader;
    private final ScrapReader scrapReader;
    private final PostRepository postRepository;
    private final PostFileService postFileService;
    private final PostTagService postTagService;
    private final PostLikeService postLikeService;
    private final ReplyService replyService;
    private final ScrapService scrapService;
    private final S3Service s3Service;
    private final PostIndexService postIndexService;
    private final PostElasticsearchRepositoryImpl postElasticsearchRepositoryImpl;

    /**
     * 게시글을 생성합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param req 게시글 작성 요청 DTO
     * @return 생성된 게시글의 ID를 포함한 응답 DTO
     */
    @Transactional
    public PostCreateRes createPost(CustomUserDetails userDetails, PostCreateReq req) {
        // 작성자 조회
        Member author = memberReader.getMemberById(userDetails.memberId());

        // Enum 매핑
        PostCategory category = PostCategory.valueOf(req.category());
        PromptType promptType = PromptType.valueOf(req.promptType());

        // 게시글 생성
        Post post = Post.builder()
                .title(req.title())
                .description(req.description())
                .category(category)
                .prompt(req.prompt())
                .type(promptType)
                .exampleQuestion(req.sampleQuestion())
                .exampleAnswer(req.sampleAnswer())
                .author(author)
                .build();

        postRepository.save(post);

        // 이미지 프롬프트인 경우 파일 처리
        String filePath = null;
        if (promptType == PromptType.IMAGE && Objects.nonNull(req.filePath())
                && !req.filePath().isBlank()) {
            filePath = postFileService.createPostFile(req.filePath(), post);
        }
        // 태그 처리
        postTagService.createTags(req.tags(), post);

        // ES 인덱싱 추가
        postIndexService.indexPost(post, filePath, req.tags());


        log.info("게시글 생성 완료 - postId: {}, type: {}", post.getId(), promptType);

        return PostCreateRes.builder().postId(post.getId()).build();
    }

    /**
     * 게시글을 수정합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 수정할 게시글 ID
     * @param req 게시글 수정 요청 DTO
     * @return 수정된 게시글의 ID를 포함한 응답 DTO
     * @throws PostNotFoundException 게시글을 찾을 수 없을 때
     * @throws PostAccessDeniedException 수정 권한이 없을 때
     */
    @Transactional
    public PostUpdateRes updatePost(CustomUserDetails userDetails, Long postId, PostUpdateReq req) {
        // 게시글 조회
        Post post = postReader.getPostById(postId);

        // 작성자 확인
        if (!post.isAuthor(userDetails.memberId())) {
            throw new PostAccessDeniedException();
        }

        // Enum 매핑
        PostCategory category = PostCategory.valueOf(req.category());
        PromptType promptType = PromptType.valueOf(req.promptType());

        // 파일 처리
        // 프롬프트 변경 여부 확인
        boolean isPromptChanged = !post.getPrompt().equals(req.prompt());

        // TEXT 타입: 프롬프트 변경 시 예시 답변 검증
        if (promptType == PromptType.TEXT && isPromptChanged) {
            // 예시 답변이 있고, 기존 값과 동일하면 에러
            if (req.sampleAnswer() != null
                    && !req.sampleAnswer().isBlank()
                    && post.getExampleAnswer() != null
                    && req.sampleAnswer().equals(post.getExampleAnswer())) {
                throw new InvalidPostRequestException(
                        "프롬프트가 변경되었습니다. 새로운 프롬프트에 맞는 예시 답변을 입력하거나 비워주세요");
            }
        }

        // IMAGE 타입: 프롬프트 변경 시 파일 검증
        if (promptType == PromptType.IMAGE && isPromptChanged) {
            // 파일 경로가 있는 경우
            if (req.filePath() != null && !req.filePath().isBlank()) {
                // 기존 파일과 동일한지 확인
                postFileReader.getPostFileByPost(post)
                        .ifPresent(existingFile -> {
                            if (existingFile.getFilePath().equals(req.filePath())) {
                                throw new InvalidPostRequestException(
                                        "프롬프트가 변경되었습니다. 새로운 프롬프트에 맞는 이미지를 업로드하거나 비워주세요");
                            }
                        });
            }
        }

        // 파일 처리
        String filePath = null;
        if (promptType == PromptType.IMAGE && Objects.nonNull(req.filePath())
                && !req.filePath().isBlank()) {
            // 이미지 타입이고 파일 경로가 있을 때만 업데이트
            filePath = postFileService.updatePostFile(post, req.filePath());
        } else if (promptType == PromptType.TEXT) {
            // 텍스트 타입으로 변경 시 기존 파일 삭제
            postFileReader.getPostFileByPost(post)
                    .ifPresent(postFileService::deletePostFile);
        }

        // 게시글 기본 정보 업데이트
        post.update(
                req.title(),
                req.description(),
                category,
                req.prompt(),
                promptType,
                req.sampleQuestion(),
                req.sampleAnswer()
        );

        // 태그 처리
        postTagService.createTags(req.tags(), post);

        // ES 재인덱싱 추가
        postIndexService.indexPost(post, filePath, req.tags());

        log.info("게시글 수정 완료 - postId: {}, type: {}", post.getId(), promptType);

        return PostUpdateRes.builder().postId(post.getId()).build();
    }

    /**
     * 게시글을 삭제합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 삭제할 게시글 ID
     * @throws PostNotFoundException 게시글을 찾을 수 없을 때
     * @throws PostAccessDeniedException 삭제 권한이 없을 때
     */
    @Transactional
    public void deletePost(CustomUserDetails userDetails, Long postId) {
        // 게시글 조회
        Post post = postReader.getPostById(postId);

        // 작성자 확인
        if (!post.isAuthor(userDetails.memberId())) {
            throw new PostAccessDeniedException();
        }

        // 좋아요 소프트 딜리트
        postLikeService.deleteLikesByPost(post);

        // Reader를 통해 파일 조회 및 삭제 처리
        postFileReader.getPostFileByPost(post)
                .ifPresent(postFileService::deletePostFile);

        // 태그 소프트 딜리트
        postTagService.deleteTags(post);

        // 게시글 소프트 딜리트
        post.deletePost();

        // ES에서 삭제 추가
        postIndexService.deletePost(postId);

        // 댓글 소프트 딜리트
        replyService.deleteRepliesByPost(post);

        // 스크랩 소프트 딜리트
        scrapService.deleteScrapsByPost(post);

        log.info("게시글 삭제 완료 - postId: {}", postId);
    }

    /**
     * 게시글 상세 조회
     *
     * @param userDetails 인증된 사용자 정보 (nullable - 비로그인 사용자 고려)
     * @param postId 조회할 게시글 ID
     * @return 게시글 상세 정보
     * @throws PostNotFoundException 게시글을 찾을 수 없을 때
     */
    @Transactional(readOnly = true)
    public PostDetailRes getPostDetail(CustomUserDetails userDetails, Long postId) {
        // Projection으로 게시글 기본 정보 조회
        PostDetailProjection projection = postReader.getPostDetailById(postId)
                .orElseThrow(PostNotFoundException::new);

        // 프로필 URL
        String profileUrl = projection.getProfilePath() != null ?
                s3Service.getCloudFrontUrl(projection.getProfilePath()) : null;

        // 파일 URL
        String fileUrl = projection.getFilePath() != null ?
                s3Service.getCloudFrontUrl(projection.getFilePath()) : null;

        // 태그 목록 (배치 조회)
        List<PostTag> postTags = postReader.getPostTagsByPostIds(List.of(postId));
        List<String> tags = postTags.stream()
                .map(pt -> pt.getTag().getName())
                .toList();

        // 현재 사용자의 좋아요 여부
        boolean isLiked = false;

        //현재 사용자의 스크랩 여부
        boolean isScraped = false;
        if (userDetails != null) {
            Member currentMember = memberReader.getMemberById(userDetails.memberId());
            isLiked = postLikeReader.existsByPostIdAndMember(postId, currentMember);

            Post post = postReader.getPostById(postId);
            isScraped = scrapReader.getScrapByPostAndMemberIncludeDeleted(post, currentMember)
                    .map(scrap -> scrap.getDeletedAt() == null)  // 삭제되지 않은 경우만 true
                    .orElse(false);
        }

        // 댓글 목록 조회 (Projection 사용)
        List<ReplyProjection> replyProjections = postReader.getRepliesByPostId(postId);
        List<PostDetailRes.ReplyDto> replyDtos = replyProjections.stream()
                .map(reply -> {
                    String replyProfileUrl = reply.getProfilePath() != null ?
                            s3Service.getCloudFrontUrl(reply.getProfilePath()) : null;

                    return PostDetailRes.ReplyDto.builder()
                            .replyId(reply.getReplyId())
                            .author(reply.getAuthorNickname())
                            .profileUrl(replyProfileUrl)
                            .content(reply.getContent())
                            .createdAt(reply.getCreatedAt())
                            .updatedAt(reply.getUpdatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 상세 조회 완료 - postId: {}", postId);

        return PostDetailRes.builder()
                .postId(projection.getPostId())
                .author(projection.getAuthorNickname())
                .profileUrl(profileUrl)
                .title(projection.getTitle())
                .description(projection.getDescription())
                .category(projection.getCategory().getName())
                .prompt(projection.getPrompt())
                .type(projection.getType().getName())
                .sampleQuestion(projection.getSampleQuestion())
                .sampleAnswer(projection.getSampleAnswer())
                .fileUrl(fileUrl)
                .tags(tags)
                .likeCnt(projection.getLikeCount().intValue())
                .replyCnt(projection.getReplyCount().intValue())
                .isLiked(isLiked)
                .isScraped(isScraped)
                .createdAt(projection.getCreatedAt())
                .replies(replyDtos)
                .build();
    }

    /**
     * 게시글 목록 조회 - V1 (개선 전: N+1 문제 있음)
     */
    /** @deprecated V3로 대체됨 */
    @Deprecated
    @Transactional(readOnly = true)
    public PostListRes getPostsV1(PostListQueryDto query) {
        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // fetchJoin 없이 조회 (N+1 발생!)
        Page<Post> postPage = postReader.getPostsWithFiltersV1(query, pageable);

        // DTO 변환 (각 게시글마다 추가 쿼리 발생)
        List<PostListItemDto> posts = postPage.getContent().stream()
                .map(post -> {
                    // 프로필 이미지 - 추가 쿼리 발생
                    String profileKey = post.getAuthor().getProfileImage();
                    String profileUrl = profileKey != null ?
                            s3Service.getCloudFrontUrl(profileKey) : null;

                    // 태그 - 각 게시글마다 쿼리 발생
                    List<String> tags = post.getPostTags().stream()
                            .filter(postTag -> postTag.getDeletedAt() == null)
                            .map(postTag -> postTag.getTag().getName())
                            .toList();

                    // 좋아요 수 - 각 게시글마다 쿼리 발생
                    int likeCnt = (int) post.getPostLikes().stream()
                            .filter(like -> like.getDeletedAt() == null)
                            .count();

                    // 댓글 수 - 각 게시글마다 쿼리 발생
                    int replyCnt = replyReader.getRepliesByPost(post).size();

                    String fileUrl = null;
                    if (post.getType() == PromptType.IMAGE && post.getPostFile() != null) {
                        fileUrl = s3Service.getCloudFrontUrl(post.getPostFile().getFilePath());
                    }

                    return PostListItemDto.builder()
                            .postId(post.getId())
                            .author(post.getAuthor().getNickname())
                            .profileUrl(profileUrl)
                            .title(post.getTitle())
                            .description(post.getDescription())
                            .type(post.getType().getName())
                            .category(post.getCategory().getName())
                            .tags(tags)
                            .likeCnt(likeCnt)
                            .replyCnt(replyCnt)
                            .fileUrl(fileUrl)
                            .createdAt(post.getCreatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 목록 조회 완료 (V1) - page: {}, size: {}, totalCount: {}",
                query.page(), query.size(), postPage.getTotalElements());

        return PostListRes.builder()
                .posts(posts)
                .itemCnt(posts.size())
                .totalCnt(postPage.getTotalElements())
                .totalPages(postPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }

    /**
     * 게시글 목록 조회 V2
     *
     * @param query 검색 조건
     * @return 게시글 목록
     */
    /** @deprecated V3로 대체됨 */
    @Deprecated
    @Transactional(readOnly = true)
    public PostListRes getPostsV2(PostListQueryDto query) {
        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // QueryDSL을 통한 동적 쿼리 실행
        Page<Post> postPage = postReader.getPostsWithFiltersV2(query, pageable);

        // DTO 변환
        List<PostListItemDto> posts = postPage.getContent().stream()
                .map(post -> {
                    // 작성자 프로필 이미지
                    String profileKey = post.getAuthor().getProfileImage();
                    String profileUrl = profileKey != null ?
                            s3Service.getCloudFrontUrl(profileKey) : null;

                    // 태그 목록
                    List<String> tags = post.getPostTags().stream()
                            .filter(postTag -> postTag.getDeletedAt() == null)
                            .map(postTag -> postTag.getTag().getName())
                            .toList();

                    // 좋아요 수
                    int likeCnt = (int) post.getPostLikes().stream()
                            .filter(like -> like.getDeletedAt() == null)
                            .count();

                    // 댓글 수
                    int replyCnt = replyReader.getRepliesByPost(post).size();

                    String fileUrl = null;
                    if (post.getType() == PromptType.IMAGE && post.getPostFile() != null) {
                        fileUrl = s3Service.getCloudFrontUrl(post.getPostFile().getFilePath());
                    }

                    return PostListItemDto.builder()
                            .postId(post.getId())
                            .author(post.getAuthor().getNickname())
                            .profileUrl(profileUrl)
                            .title(post.getTitle())
                            .description(post.getDescription())
                            .type(post.getType().getName())
                            .category(post.getCategory().getName())
                            .tags(tags)
                            .likeCnt(likeCnt)
                            .replyCnt(replyCnt)
                            .fileUrl(fileUrl)
                            .createdAt(post.getCreatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 목록 조회 완료 - page: {}, size: {}, totalCount: {}",
                query.page(), query.size(), postPage.getTotalElements());

        return PostListRes.builder()
                .posts(posts)
                .itemCnt(posts.size())
                .totalCnt(postPage.getTotalElements())
                .totalPages(postPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }



    /**
     * 게시글 목록 조회 - V3 (Projection 사용 - 최종 개선)
     */
    @Transactional(readOnly = true)
    public PostListRes getPostsV3(PostListQueryDto query) {
        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // Projection으로 필요한 데이터만 조회
        Page<PostListItemProjection> projectionPage = postReader.getPostsWithFiltersV3(query, pageable);

        // 게시글 ID 목록 추출
        List<Long> postIds = projectionPage.getContent().stream()
                .map(PostListItemProjection::getPostId)
                .toList();

        // 태그는 별도 조회 (배치 처리)
        List<PostTag> postTags = postReader.getPostTagsByPostIds(postIds);

        // 게시글 ID별 태그 맵 생성
        Map<Long, List<String>> tagMap = postTags.stream()
                .collect(Collectors.groupingBy(
                        pt -> pt.getPost().getId(),
                        Collectors.mapping(
                                pt -> pt.getTag().getName(),
                                Collectors.toList()
                        )
                ));

        // DTO 변환
        List<PostListItemDto> postItems = projectionPage.getContent().stream()
                .map(projection -> {
                    // 프로필 URL
                    String profileUrl = projection.getProfilePath() != null ?
                            s3Service.getCloudFrontUrl(projection.getProfilePath()) : null;

                    // 파일 URL
                    String fileUrl = projection.getFilePath() != null ?
                            s3Service.getCloudFrontUrl(projection.getFilePath()) : null;

                    // 태그
                    List<String> tags = tagMap.getOrDefault(projection.getPostId(), List.of());

                    return PostListItemDto.builder()
                            .postId(projection.getPostId())
                            .author(projection.getAuthorNickname())
                            .profileUrl(profileUrl)
                            .title(projection.getTitle())
                            .description(projection.getDescription())
                            .type(projection.getTypeName())
                            .category(projection.getCategoryName())
                            .tags(tags)
                            .likeCnt(projection.getLikeCount().intValue())
                            .replyCnt(projection.getReplyCount().intValue())
                            .fileUrl(fileUrl)
                            .createdAt(projection.getCreatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 목록 조회 완료 (V3 - Projection) - page: {}, size: {}, totalCount: {}",
                query.page(), query.size(), projectionPage.getTotalElements());

        return PostListRes.builder()
                .posts(postItems)
                .itemCnt(postItems.size())
                .totalCnt(projectionPage.getTotalElements())
                .totalPages(projectionPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }

    /**
     * 게시글 목록 조회 V4 (ElasticSearch 사용)
     */
    @Transactional(readOnly = true)
    public PostListRes getPostsV4(PostListQueryDto query) {
        // 페이징 설정
        Pageable pageable = PageRequest.of(query.page() - 1, query.size());

        // ElasticSearch로 검색
        Page<PostDocument> documentPage = postElasticsearchRepositoryImpl.searchPosts(query, pageable);

        // DTO 변환
        List<PostListItemDto> postItems = documentPage.getContent().stream()
                .map(doc -> {
                    // 프로필 URL
                    String profileUrl = doc.getProfilePath() != null ?
                            s3Service.getCloudFrontUrl(doc.getProfilePath()) : null;

                    // 파일 URL
                    String fileUrl = doc.getFilePath() != null ?
                            s3Service.getCloudFrontUrl(doc.getFilePath()) : null;

                    return PostListItemDto.builder()
                            .postId(doc.getId())
                            .author(doc.getAuthorNickname())
                            .profileUrl(profileUrl)
                            .title(doc.getTitle())
                            .description(doc.getDescription())
                            .type(doc.getType())
                            .category(doc.getCategory())
                            .tags(doc.getTags())
                            .likeCnt(doc.getLikeCount())
                            .replyCnt(doc.getReplyCount())
                            .fileUrl(fileUrl)
                            .createdAt(doc.getCreatedAt())
                            .build();
                })
                .toList();

        log.info("게시글 목록 조회 완료 (V4 - ElasticSearch) - page: {}, size: {}, totalCount: {}",
                query.page(), query.size(), documentPage.getTotalElements());

        return PostListRes.builder()
                .posts(postItems)
                .itemCnt(postItems.size())
                .totalCnt(documentPage.getTotalElements())
                .totalPages(documentPage.getTotalPages())
                .currentPage(query.page())
                .build();
    }
}
package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostFile;
import com.ssafy.a208.domain.board.entity.PostLike;
import com.ssafy.a208.domain.board.repository.PostFileRepository;
import com.ssafy.a208.domain.board.repository.PostRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import com.ssafy.a208.domain.member.repository.ProfileRepository;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.repository.SpaceRepository;
import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.repository.PostTagRepository;
import com.ssafy.a208.domain.tag.repository.TagRepository;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.common.enums.SpaceType;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@SpringBootTest
@ActiveProfiles("test")
@Disabled("테스트 데이터 생성 방지")
public class TestDataGenerator {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostFileRepository postFileRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private PostTagRepository postTagRepository;
    @Autowired
    private SpaceRepository spaceRepository;

    private final Random random = new Random();

    @Test
    @DisplayName("테스트 데이터 생성 - 게시글 100개")
    @Transactional
    @Rollback(false)
    void generateTestData() {
        log.info("========== 테스트 데이터 생성 시작 ==========");

        List<Member> members = createMembers(10);
        log.info("✅ 회원 {}명 생성 완료 (프로필 포함)", members.size());

        List<Tag> tags = createTags(20);
        log.info("✅ 태그 {}개 생성 완료", tags.size());

        List<Post> posts = createPosts(members, 100);
        log.info("✅ 게시글 {}개 생성 완료", posts.size());

        int imageCount = createPostFiles(posts);
        log.info("✅ 이미지 파일 {}개 생성 완료", imageCount);

        createPostTags(posts, tags);
        log.info("✅ 게시글-태그 연결 완료");

        int likeCount = createPostLikes(posts, members);
        log.info("✅ 좋아요 {}개 생성 완료", likeCount);

        log.info("========== 테스트 데이터 생성 완료 ==========");
        log.info("총 회원: {}명 (프로필 {}개)", members.size(), members.size());
        log.info("총 태그: {}개", tags.size());
        log.info("총 게시글: {}개 (이미지: {}개)", posts.size(), imageCount);
        log.info("총 좋아요: {}개", likeCount);
    }

    /**
     * 회원 + 프로필 생성
     */
    private List<Member> createMembers(int count) {
        List<Member> members = new ArrayList<>();

        for (int i = 1; i <= count; i++) {
            // 닉네임 중복 방지
            String baseNickname = "유저" + i;
            String nickname = baseNickname;

            int attempt = 0;
            while (memberRepository.existsByNickname(nickname)) {
                nickname = baseNickname + "_" + UUID.randomUUID().toString().substring(0, 5);
                attempt++;
                if (attempt > 5) break;
            }

            Space personalSpace = Space.builder()
                    .name(nickname + "의 개인공간")
                    .type(SpaceType.PERSONAL)
                    .build();
            personalSpace = spaceRepository.save(personalSpace);

            Member member = Member.builder()
                    .email("u" + i + "@test.com")
                    .password("password" + i)
                    .nickname(nickname)
                    .usableCnt(100)
                    .personalSpace(personalSpace)
                    .build();
            member = memberRepository.save(member);

            Profile profile = Profile.builder()
                    .member(member)
                    .originalName("profile_" + i + ".jpg")
                    .filePath("profiles/test-profile-" + i + ".jpg")
                    .contentType("image/jpeg")
                    .size((long) (random.nextInt(3000) + 1000))
                    .build();
            profileRepository.save(profile);

            members.add(member);
        }
        return members;
    }

    /**
     * 태그 생성
     */
    private List<Tag> createTags(int count) {
        List<Tag> tags = new ArrayList<>();
        String[] tagNames = {
                "일상", "업무", "개발", "디자인", "AI", "GPT", "이미지",
                "창작", "예술", "코딩", "자동화", "효율", "생산성",
                "마케팅", "글쓰기", "번역", "교육", "학습", "취업", "면접"
        };

        for (int i = 0; i < Math.min(count, tagNames.length); i++) {
            Tag tag = Tag.builder().name(tagNames[i]).build();
            tags.add(tagRepository.save(tag));
        }
        return tags;
    }

    /**
     * 게시글 생성
     */
    private List<Post> createPosts(List<Member> members, int count) {
        List<Post> posts = new ArrayList<>();

        String[] titles = {
                "AI 프롬프트 작성법", "업무 자동화 프롬프트", "코딩 도우미 프롬프트",
                "창의적인 글쓰기 프롬프트", "이미지 생성 프롬프트", "번역 프롬프트",
                "마케팅 문구 생성", "이력서 작성 도우미", "면접 준비 프롬프트",
                "데이터 분석 프롬프트", "고객 응대 프롬프트", "교육용 프롬프트"
        };

        String[] descriptions = {
                "효율적인 AI 활용을 위한 프롬프트입니다.",
                "일상 업무를 자동화할 수 있는 프롬프트입니다.",
                "프로그래밍에 도움이 되는 프롬프트입니다.",
                "창의적인 콘텐츠 제작을 위한 프롬프트입니다.",
                "고품질 이미지 생성을 위한 프롬프트입니다."
        };

        String[] textPrompts = {
                "친절하고 상세하게 설명해주세요.",
                "전문적인 어투로 작성해주세요.",
                "초보자도 이해하기 쉽게 설명해주세요."
        };

        String[] imagePrompts = {
                "A beautiful landscape with mountains and sunset, detailed, 4k, realistic",
                "Fantasy character design, detailed armor, magical effects, concept art",
                "Modern minimalist logo design, clean lines, professional",
                "Cute cartoon character, colorful, friendly expression",
                "Cyberpunk city at night, neon lights, rain, cinematic"
        };

        PostCategory[] categories = PostCategory.values();

        for (int i = 1; i <= count; i++) {
            Member randomMember = members.get(random.nextInt(members.size()));
            String title = titles[random.nextInt(titles.length)] + " " + i;
            String description = descriptions[random.nextInt(descriptions.length)];
            PostCategory category = categories[random.nextInt(categories.length)];

            PromptType type = (i % 2 == 0) ? PromptType.IMAGE : PromptType.TEXT;
            String prompt = type == PromptType.IMAGE
                    ? imagePrompts[random.nextInt(imagePrompts.length)]
                    : textPrompts[random.nextInt(textPrompts.length)];

            Post post = Post.builder()
                    .title(title)
                    .description(description)
                    .category(category)
                    .prompt(prompt)
                    .type(type)
                    .exampleQuestion(type == PromptType.TEXT ? "예시 질문 " + i : null)
                    .exampleAnswer(type == PromptType.TEXT ? "예시 답변 " + i : null)
                    .author(randomMember)
                    .build();

            posts.add(postRepository.save(post));
        }
        return posts;
    }

    /**
     * 이미지 프롬프트에 파일 추가
     */
    private int createPostFiles(List<Post> posts) {
        int count = 0;
        String[] imageExtensions = {"jpg", "png", "webp"};

        for (Post post : posts) {
            if (post.getType() == PromptType.IMAGE) {
                String uuid = UUID.randomUUID().toString();
                String extension = imageExtensions[random.nextInt(imageExtensions.length)];
                String filePath = "posts/" + uuid + "." + extension;

                PostFile postFile = PostFile.builder()
                        .originalName("test_image_" + post.getId() + "." + extension)
                        .filePath(filePath)
                        .contentType("image/" + extension)
                        .size((long) (random.nextInt(5000) + 1000))
                        .post(post)
                        .build();

                postFileRepository.save(postFile);
                count++;
            }
        }
        return count;
    }

    /**
     * 게시글-태그 연결
     */
    private void createPostTags(List<Post> posts, List<Tag> tags) {
        for (Post post : posts) {
            int tagCount = random.nextInt(5) + 1;
            Set<Tag> usedTags = new HashSet<>();

            for (int i = 0; i < tagCount; i++) {
                Tag tag = tags.get(random.nextInt(tags.size()));
                if (usedTags.add(tag)) {
                    PostTag postTag = PostTag.builder()
                            .post(post)
                            .tag(tag)
                            .build();
                    postTagRepository.save(postTag);
                }
            }
        }
    }

    /**
     * 좋아요 생성
     */
    private int createPostLikes(List<Post> posts, List<Member> members) {
        int totalLikes = 0;

        for (Post post : posts) {
            int likeCount = random.nextInt(11);
            Set<Member> usedMembers = new HashSet<>();

            for (int i = 0; i < likeCount; i++) {
                Member member = members.get(random.nextInt(members.size()));
                if (usedMembers.add(member)) {
                    PostLike postLike = PostLike.builder()
                            .post(post)
                            .member(member)
                            .build();

                    post.getPostLikes().add(postLike);
                    totalLikes++;
                }
            }
        }
        postRepository.flush();
        return totalLikes;
    }

    @Test
    @DisplayName("테스트 데이터 삭제")
    @Transactional
    void clearTestData() {
        log.info("========== 테스트 데이터 삭제 시작 ==========");
        postFileRepository.deleteAll();
        postTagRepository.deleteAll();
        postRepository.deleteAll();
        tagRepository.deleteAll();
        profileRepository.deleteAll();
        memberRepository.deleteAll();
        spaceRepository.deleteAll();
        log.info("✅ 모든 데이터 삭제 완료");
    }

    @Test
    @DisplayName("소규모 테스트 데이터 - 30개")
    @Transactional
    @Rollback(false)
    void generateSmallTestData() {
        log.info("========== 소규모 테스트 데이터 생성 ==========");
        List<Member> members = createMembers(5);
        List<Tag> tags = createTags(10);
        List<Post> posts = createPosts(members, 30);
        int imageCount = createPostFiles(posts);
        createPostTags(posts, tags);
        int likeCount = createPostLikes(posts, members);
        log.info("소규모 테스트 데이터 생성 완료: 회원 {}명, 게시글 {}개, 이미지 {}개, 좋아요 {}개",
                members.size(), posts.size(), imageCount, likeCount);
    }
}

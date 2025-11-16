package com.ssafy.a208.domain.contest.document;

import com.ssafy.a208.global.common.enums.PromptType;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

import java.time.LocalDateTime;

@Getter
@Builder
@Document(indexName = "submissions")
@Setting(settingPath = "elasticsearch/submission-settings.json")
@Mapping(mappingPath = "elasticsearch/submission-mappings.json")
public class SubmissionDocument {

    @Id
    private Long id;

    private String prompt;
    private String description;
    private String result;
    private PromptType type;
    private long voteCount;
    private String filePath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 조회 시 타 테이블과 조인하지 않게 필요한 정보 추가
    private Long contestId;
    private Long memberId;

    // TODO: 이거는 사용자가 정보 바꾸면 어떻게 됨??
    //  멤버 업데이트 할 때 엘라스틱 서치도 수정하나?
    //  대회만 찾고 사용자 정보는 RDB에서 찾는 게 맞나?
    private String memberNickname;
    private String profilePath;
}

package com.ssafy.a208.domain.contest.document;

import com.ssafy.a208.global.common.enums.PromptType;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
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

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime createdAt;
    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime updatedAt;

    // 조회 시 타 테이블과 조인하지 않게 필요한 정보 추가
    private Long contestId;
    private Long memberId;

    private String memberNickname;
    private String profilePath;

    public void updateMemberInfo(String newNickname, String newProfilePath) {
        this.memberNickname = newNickname;
        this.profilePath = newProfilePath;
    }

    public void updateVoteCount(long newVoteCount) {
        this.voteCount = newVoteCount;
    }
}

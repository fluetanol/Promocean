package com.ssafy.a208.domain.board.document;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@Document(indexName = "posts")
@Setting(settingPath = "elasticsearch/post-settings.json")
@Mapping(mappingPath = "elasticsearch/post-mappings.json")
public class PostDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Text, analyzer = "nori")
    private String title;

    @Field(type = FieldType.Text, analyzer = "nori")
    private String description;

    @Field(type = FieldType.Keyword)
    private String authorNickname;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Keyword)
    private String type;

    @Field(type = FieldType.Keyword)
    private List<String> tags;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime createdAt;

    @Field(type = FieldType.Integer)
    private Integer likeCount;

    @Field(type = FieldType.Integer)
    private Integer replyCount;

    @Field(type = FieldType.Long)
    private Long popularityScore;

    @Field(type = FieldType.Keyword, index = false)
    private String profilePath;

    @Field(type = FieldType.Keyword, index = false)
    private String filePath;

    /**
     * 인기 점수 계산
     * 좋아요 수 * 10 + 댓글 수
     */
    public static Long calculatePopularityScore(Integer likeCount, Integer replyCount) {
        int likes = likeCount != null ? likeCount : 0;
        int replies = replyCount != null ? replyCount : 0;
        return (long) (likes * 10 + replies);
    }

    public void updateMemberInfo(String newNickname, String newProfilePath) {
        this.authorNickname = newNickname;
        this.profilePath = newProfilePath;
    }
}
package com.ssafy.a208.domain.scrap.document;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@Document(indexName = "scraps")
@Setting(settingPath = "elasticsearch/scrap-settings.json")
@Mapping(mappingPath = "elasticsearch/scrap-mappings.json")
public class ScrapDocument {

    @Id
    private String id;

    @Field(type = FieldType.Long)
    private Long scrapId;

    @Field(type = FieldType.Long)
    private Long memberId;

    @Field(type = FieldType.Long)
    private Long postId;

    @Field(type = FieldType.Text, analyzer = "nori")
    private String title;

    @Field(type = FieldType.Keyword)
    private String authorNickname;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Keyword)
    private String type;

    @Field(type = FieldType.Keyword)
    private List<String> tags;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime scrapCreatedAt;

    @Field(type = FieldType.Boolean)
    private Boolean isDeleted;

    @Field(type = FieldType.Keyword, index = false)
    private String profilePath;

    @Field(type = FieldType.Keyword, index = false)
    private String filePath;
}
package com.ssafy.a208.domain.tag.document;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

@Getter
@Builder
@Document(indexName = "tags")
@Setting(settingPath = "elasticsearch/tag-settings.json")
@Mapping(mappingPath = "elasticsearch/tag-mappings.json")
public class TagDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Text, analyzer = "korean_nori")
    private String name;

    @Field(type = FieldType.Integer)
    private Integer usageCnt;
}
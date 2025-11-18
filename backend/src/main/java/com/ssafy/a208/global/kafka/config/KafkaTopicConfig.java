package com.ssafy.a208.global.kafka.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.config.TopicConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    // 로컬 환경용 (replication factor 1)
    @Bean
    @Profile("local")
    public NewTopic postLikesTopicLocal() {
        return TopicBuilder.name("post-likes")
                .partitions(3)  // 로컬은 partition도 줄임
                .replicas(1)    // 1
                .config(TopicConfig.RETENTION_MS_CONFIG, "604800000") // 7일
                .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "gzip")
                .build();
    }

    @Bean
    @Profile("local")
    public NewTopic postCommentsTopicLocal() {
        return TopicBuilder.name("post-comments")
                .partitions(3)  // 로컬은 partition도 줄임
                .replicas(1)    // 1
                .config(TopicConfig.RETENTION_MS_CONFIG, "604800000") // 7일
                .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "gzip")
                .build();
    }

    // 프로덕션 환경용 (replication factor 2)
    @Bean
    @Profile("prod")
    public NewTopic postLikesTopicProd() {
        return TopicBuilder.name("post-likes")
                .partitions(3)
                .replicas(2)    // 프로덕션은 2
                .config(TopicConfig.MIN_IN_SYNC_REPLICAS_CONFIG, "2")
                .config(TopicConfig.RETENTION_MS_CONFIG, "604800000") // 7일
                .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "gzip")
                .build();
    }

    @Bean
    @Profile("prod")
    public NewTopic postCommentsTopicProd() {
        return TopicBuilder.name("post-comments")
                .partitions(3)
                .replicas(2)    // 프로덕션은 2
                .config(TopicConfig.MIN_IN_SYNC_REPLICAS_CONFIG, "2")
                .config(TopicConfig.RETENTION_MS_CONFIG, "604800000") // 7일
                .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "gzip")
                .build();
    }
}
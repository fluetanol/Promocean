package com.ssafy.a208.global.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * WebClient 전역 설정 클래스
 * Spring의 비동기 HTTP 클라이언트인 WebClient를 Bean으로 등록하여
 * 외부 API(GPT-5, Gemini 등) 호출 시 재사용할 수 있도록 설정
 */
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024)) // 10MB
                .build();
    }
}
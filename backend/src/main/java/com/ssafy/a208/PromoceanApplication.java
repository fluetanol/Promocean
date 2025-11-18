package com.ssafy.a208;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableJpaAuditing
@SpringBootApplication
public class PromoceanApplication {

    public static void main(String[] args) {
        SpringApplication.run(PromoceanApplication.class, args);
    }

}

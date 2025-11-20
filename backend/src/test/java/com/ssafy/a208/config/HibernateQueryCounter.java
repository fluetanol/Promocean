package com.ssafy.a208.config;

import jakarta.persistence.EntityManagerFactory;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class HibernateQueryCounter {

    private final Statistics statistics;

    public HibernateQueryCounter(EntityManagerFactory entityManagerFactory) {
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        this.statistics = sessionFactory.getStatistics();
        this.statistics.setStatisticsEnabled(true);
    }

    public void start() {
        statistics.clear();
    }

    public long getQueryCount() {
        return statistics.getPrepareStatementCount();
    }

    public void printStatistics() {
        log.info("=== Hibernate Statistics ===");
        log.info("쿼리 실행 횟수: {}", statistics.getPrepareStatementCount());
        log.info("===========================");
    }
}
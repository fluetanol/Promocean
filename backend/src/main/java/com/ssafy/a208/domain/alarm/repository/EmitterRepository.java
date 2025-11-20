package com.ssafy.a208.domain.alarm.repository;

import java.util.Map;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public interface EmitterRepository {

    SseEmitter save(String emitterId, SseEmitter emitter);

    void deleteById(String emitterId);

    Map<String, Object> findAllEventCacheStartWithByMemberId(String memberId);

    Map<String, SseEmitter> findAllEmitterStartWithByMemberId(String memberId);

    void saveEventCache(String emitterId, Object event);
}

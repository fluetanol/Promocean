package com.ssafy.a208.domain.alarm.service;

import com.ssafy.a208.domain.alarm.dto.AlarmDto;
import com.ssafy.a208.domain.alarm.dto.AlarmListRes;
import com.ssafy.a208.domain.alarm.dto.AlarmReq;
import com.ssafy.a208.domain.alarm.repository.EmitterRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.redis.repository.AlarmRedisRepository;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import com.ssafy.a208.global.security.util.JwtProvider;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRedisRepository redisRepository;
    private final EmitterRepository emitterRepository;

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final JwtProvider jwtProvider;
    private final MemberReader memberReader;

    public SseEmitter subscribe(String token, String lastEventId) {
        //회원 찾기
        Long memberId = jwtProvider.getMemberId(token);

        // 고유한 아이디 생성
        String emitterId = memberId + "_" + System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        //시간 초과나 비동기 요청이 안되면 자동으로 삭제
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        //최초 연결시 더미데이터가 없으면 503 오류가 발생하기 때문에 해당 더미 데이터 생성
        sendToClient(emitter, emitterId, "EventStream Created");

        //lastEventId 있다는것은 연결이 종료됬다. 그래서 해당 데이터가 남아있는지 살펴보고 있다면 남은 데이터를 전송
        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByMemberId(
                    String.valueOf(memberId));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }
        return emitter;
    }

    public void send(Member receiver, AlarmReq alarmReq) {
        // 알람 정보 redis 저장
        AlarmDto alarm = redisRepository.saveAlarm(alarmReq, receiver);

        // SSE 알림 전송
        Map<String, SseEmitter> sseEmitters = emitterRepository
                .findAllEmitterStartWithByMemberId(receiver.getId().toString());
        sseEmitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, alarm);
                    sendToClient(emitter, key, new ApiResponse<>(null, alarm));
                }
        );
    }

    public AlarmListRes getAlarms(CustomUserDetails userDetails) {
        //읽은 시간 업데이트
        Member member = memberReader.getMemberById(userDetails.memberId());
        member.updateReadTime();

        return redisRepository.findAllByMemberId(userDetails.memberId());
    }

    public void deleteAllAlarms(CustomUserDetails userDetails) {
        redisRepository.deleteAllAlarms(userDetails.memberId());
    }

    public void deleteAlarm(CustomUserDetails userDetails, Long alarmId) {
        redisRepository.deleteAlarm(userDetails.memberId(), alarmId);
    }

    private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(emitterId)
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
            log.warn("SSE 전송 실패 emitterId={}", emitterId);
        }
    }

}

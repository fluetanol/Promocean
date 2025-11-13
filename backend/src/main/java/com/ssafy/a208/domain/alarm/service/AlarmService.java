package com.ssafy.a208.domain.alarm.service;

import com.ssafy.a208.domain.alarm.dto.AlarmDto;
import com.ssafy.a208.domain.alarm.dto.AlarmReq;
import com.ssafy.a208.domain.alarm.repository.EmitterRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.common.enums.AlarmCategory;
import com.ssafy.a208.global.redis.repository.AlarmRedisRepository;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
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

    public SseEmitter subscribe(CustomUserDetails userDetails, String lastEventId) {
        // 고유한 아이디 생성
        String emitterId = userDetails.memberId() + "_" + System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        //시간 초과나 비동기 요청이 안되면 자동으로 삭제
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        //최초 연결시 더미데이터가 없으면 503 오류가 발생하기 때문에 해당 더미 데이터 생성
        sendToClient(emitter, emitterId,
                "EventStream Created. [memberId=" + userDetails.memberId() + "]");

        //lastEventId 있다는것은 연결이 종료됬다. 그래서 해당 데이터가 남아있는지 살펴보고 있다면 남은 데이터를 전송
        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByMemberId(
                    String.valueOf(userDetails.memberId()));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }
        return emitter;
    }

    public void send(Member receiver, AlarmReq alarmReq) {
        // 알람 정보 redis 저장
        AlarmDto alarm = createAlarm(receiver, alarmReq);

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

    private AlarmDto createAlarm(Member member, AlarmReq alarmReq) {
        long now = LocalDateTime.now().atZone(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();

        AlarmDto dto = AlarmDto.builder()
                .message(createMessage(alarmReq))
                .createdAt(now)
                .memberId(member.getId())
                .category(alarmReq.category())

                .spaceId(alarmReq.spaceId())
                .contestId(alarmReq.contestId())
                .noticeId(alarmReq.noticeId())
                .postId(alarmReq.postId())
                .replyId(alarmReq.replyId())
                .build();
        redisRepository.saveNotification(dto);

        return dto;
    }

    private String createMessage(AlarmReq alarmReq) {
        AlarmCategory category = alarmReq.category();

        return switch (category) {
            case CONTEST_NOTICE -> String.format("%s에 공지가 생성됐습니다. [%s]", alarmReq.contestTitle(),
                    alarmReq.noticeTitle());
            case POST_REPLY -> String.format("%s에 댓글이 생성됐습니다. [%s]", alarmReq.postTitle(),
                    alarmReq.replyContent());
            case TEAM_INVITATION -> String.format("%s에 초대되었습니다.", alarmReq.spaceName());
        };
    }


}

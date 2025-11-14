package com.ssafy.a208.global.redis.repository;

import com.ssafy.a208.domain.alarm.dto.AlarmDto;
import com.ssafy.a208.domain.alarm.dto.AlarmInfoRes;
import com.ssafy.a208.domain.alarm.dto.AlarmListRes;
import com.ssafy.a208.domain.alarm.dto.AlarmReq;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.enums.AlarmCategory;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AlarmRedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String MEMBER_PREFIX = "members:";
    private static final String ALARM_PREFIX = "alarm:";
    private static final long ALARM_TTL_DAYS = 3;

    private String getAlarmKey(Long alarmId) {
        return ALARM_PREFIX + alarmId;
    }

    private String getAlarmListKey(Long memberId) {
        return ALARM_PREFIX + MEMBER_PREFIX + memberId;
    }

    public AlarmDto saveAlarm(AlarmReq alarmReq, Member member) {
        Long alarmId = redisTemplate.opsForValue().increment(ALARM_PREFIX + "seq");
        String key = getAlarmKey(alarmId);

        long now = LocalDateTime.now().atZone(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();

        AlarmDto alarm = AlarmDto.builder()
                .alarmId(alarmId)
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

        redisTemplate.opsForValue().set(key, alarm, Duration.ofDays(ALARM_TTL_DAYS));

        String alarmListKey = getAlarmListKey(alarm.memberId());
        redisTemplate.opsForList().leftPush(alarmListKey, alarmId.toString());

        return alarm;
    }


    public AlarmListRes findAllByMemberId(Long memberId) {
        String alarmListKey = getAlarmListKey(memberId);

        List<Object> ids = redisTemplate.opsForList().range(alarmListKey, 0, -1);
        List<AlarmDto> result = new ArrayList<>();

        for (Object idObj : ids) {
            String id = idObj.toString();
            String alarmKey = getAlarmKey(Long.parseLong(id));

            Object alarmObj = redisTemplate.opsForValue().get(alarmKey);

            if (alarmObj != null) {
                // 존재하면 결과에 추가
                result.add((AlarmDto) alarmObj);
            } else {
                // 존재하지 않으면 리스트에서 제거 (clean-up)
                redisTemplate.opsForList().remove(alarmListKey, 1, id);
            }
        }

        List<AlarmInfoRes> alarms = new ArrayList<>();
        for (AlarmDto alarm : result) {
            LocalDateTime time = Instant.ofEpochMilli(alarm.createdAt())
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();

            AlarmInfoRes info = AlarmInfoRes.builder()
                    .alarmId(alarm.alarmId())
                    .message(alarm.message())
                    .category(alarm.category().name())
                    .createdAt(time)
                    .spaceId(alarm.spaceId())
                    .contestId(alarm.contestId())
                    .noticeId(alarm.noticeId())
                    .postId(alarm.postId())
                    .replyId(alarm.replyId())
                    .build();
            alarms.add(info);
        }

        return AlarmListRes.builder().alarms(alarms).build();
    }

    public Optional<AlarmInfoRes> findLatestAlarm(Long memberId) {
        String alarmListKey = getAlarmListKey(memberId);

        List<Object> ids = redisTemplate.opsForList().range(alarmListKey, 0, -1);
        AlarmDto result = null;

        for (Object idObj : ids) {
            String id = idObj.toString();
            String alarmKey = getAlarmKey(Long.parseLong(id));

            Object alarmObj = redisTemplate.opsForValue().get(alarmKey);

            if (alarmObj != null) {
                result = (AlarmDto) alarmObj;
                break;
            } else {
                redisTemplate.opsForList().remove(alarmListKey, 1, id);
            }
        }

        if (Objects.isNull(result)) {
            return Optional.empty();
        }

        LocalDateTime time = Instant.ofEpochMilli(result.createdAt())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        return Optional.of(AlarmInfoRes.builder()
                .alarmId(result.alarmId())
                .message(result.message())
                .category(result.category().name())
                .createdAt(time)
                .spaceId(result.spaceId())
                .contestId(result.contestId())
                .noticeId(result.noticeId())
                .postId(result.postId())
                .replyId(result.replyId())
                .build()
        );
    }


    public void deleteAlarm(Long memberId, Long alarmId) {
        String alarmKey = getAlarmKey(alarmId);
        redisTemplate.delete(alarmKey);

        String alarmListKey = getAlarmListKey(memberId);
        redisTemplate.opsForList().remove(alarmListKey, 1, alarmId.toString());
    }

    public void deleteAllAlarms(Long memberId) {
        String alarmListKey = getAlarmListKey(memberId);

        // 1) 리스트 안의 모든 alarmId 가져오기
        List<Object> ids = redisTemplate.opsForList().range(alarmListKey, 0, -1);

        if (ids != null) {
            for (Object id : ids) {
                String alarmKey = getAlarmKey(Long.parseLong(id.toString()));
                redisTemplate.delete(alarmKey);
            }
        }

        // 2) alarm:members:{memberId} 리스트 자체 삭제
        redisTemplate.delete(alarmListKey);
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
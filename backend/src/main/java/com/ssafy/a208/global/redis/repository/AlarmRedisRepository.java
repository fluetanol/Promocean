package com.ssafy.a208.global.redis.repository;

import com.ssafy.a208.domain.alarm.dto.AlarmDto;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
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

    public void saveNotification(AlarmDto alarm) {
        Long alarmId = redisTemplate.opsForValue().increment(ALARM_PREFIX + "seq");
        String key = getAlarmKey(alarmId);

        redisTemplate.opsForValue().set(key, alarm, Duration.ofDays(ALARM_TTL_DAYS));

        String alarmListKey = getAlarmListKey(alarm.memberId());
        redisTemplate.opsForList().leftPush(alarmListKey, alarmId.toString());
    }


    public List<AlarmDto> findAllByMemberId(Long memberId) {
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

        return result;
    }


    public void deleteNotification(Long memberId, Long alarmId) {
        String alarmKey = getAlarmKey(alarmId);
        redisTemplate.delete(alarmKey);

        String alarmListKey = getAlarmListKey(memberId);
        redisTemplate.opsForList().remove(alarmListKey, 1, alarmId.toString());
    }

}
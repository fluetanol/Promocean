package com.ssafy.a208.domain.alarm.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record AlarmListRes(
        List<AlarmInfoRes> alarms
) {

}

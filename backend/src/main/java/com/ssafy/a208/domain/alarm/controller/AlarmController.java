package com.ssafy.a208.domain.alarm.controller;

import com.ssafy.a208.domain.alarm.dto.AlarmListRes;
import com.ssafy.a208.domain.alarm.service.AlarmService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/alarms")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<ApiResponse<SseEmitter>> subscribe(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId
    ) {
        SseEmitter sseEmitter = alarmService.subscribe(userDetails, lastEventId);
        return ApiResponse.ok(sseEmitter);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<AlarmListRes>> getAlarms(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        AlarmListRes alarms = alarmService.getAlarms(userDetails);
        return ApiResponse.ok(alarms);
    }

}

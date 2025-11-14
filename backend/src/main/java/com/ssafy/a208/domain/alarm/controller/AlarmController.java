package com.ssafy.a208.domain.alarm.controller;

import com.ssafy.a208.domain.alarm.dto.AlarmListRes;
import com.ssafy.a208.domain.alarm.service.AlarmService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/alarms")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(
            @RequestParam("token") String token,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId
    ) {
        SseEmitter sseEmitter = alarmService.subscribe(token, lastEventId);
        return sseEmitter;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<AlarmListRes>> getAlarms(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        AlarmListRes alarms = alarmService.getAlarms(userDetails);
        return ApiResponse.ok(alarms);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteAllAlarms(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        alarmService.deleteAllAlarms(userDetails);
        return ApiResponse.ok();
    }

    @DeleteMapping("/{alarmId}")
    public ResponseEntity<ApiResponse<Void>> deleteAlarm(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long alarmId
    ) {
        alarmService.deleteAlarm(userDetails, alarmId);
        return ApiResponse.ok();
    }

}

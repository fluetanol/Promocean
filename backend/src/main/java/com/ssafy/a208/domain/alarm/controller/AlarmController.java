package com.ssafy.a208.domain.alarm.controller;

import com.ssafy.a208.domain.alarm.dto.AlarmListRes;
import com.ssafy.a208.domain.alarm.service.AlarmService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "알림", description = "SSE 구독, 알림조회, 알림 단일삭제/전체삭제 API가 담겨있어요.")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "SSE 구독 API", description = "로그인 후 브라우저 접속 시 SSE 구독을 요청하는 API입니다.")
    public SseEmitter subscribe(
            @RequestParam("token") String token,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId
    ) {
        SseEmitter sseEmitter = alarmService.subscribe(token, lastEventId);
        return sseEmitter;
    }

    @GetMapping
    @Operation(summary = "알림 목록조회 API", description = "로그인 후 알림 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<AlarmListRes>> getAlarms(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        AlarmListRes alarms = alarmService.getAlarms(userDetails);
        return ApiResponse.ok(alarms);
    }

    @DeleteMapping
    @Operation(summary = "알림 전체삭제 API", description = "알림함 비우기에 사용하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> deleteAllAlarms(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        alarmService.deleteAllAlarms(userDetails);
        return ApiResponse.ok();
    }

    @DeleteMapping("/{alarmId}")
    @Operation(summary = "알림 단일삭제 API", description = "특정 알림을 삭제하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> deleteAlarm(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long alarmId
    ) {
        alarmService.deleteAlarm(userDetails, alarmId);
        return ApiResponse.ok();
    }

}

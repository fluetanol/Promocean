package com.ssafy.a208.global.common.dto;

import com.ssafy.a208.global.common.exception.ApiException;
import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Builder
public record ApiResponse<T>(
        String message,
        T data
) {

    public static <T> ApiResponse<T> of(String message) {
        return ApiResponse.<T>builder().message(message).build();
    }

    public static <T> ResponseEntity<ApiResponse<T>> of(HttpStatus status) {
        return ResponseEntity.status(status)
                .body(ApiResponse.<T>builder().build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> of(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(ApiResponse.<T>builder().message(message).build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> of(HttpStatus status, T data) {
        return ResponseEntity.status(status)
                .body(ApiResponse.<T>builder().data(data).build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> ofToken(T data, String token) {
        return ResponseEntity.status(HttpStatus.OK)
                .header("Authorization", token)
                .body(ApiResponse.<T>builder().data(data).build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> of(HttpStatus status, String message, T data) {
        return ResponseEntity.status(status)
                .body(ApiResponse.<T>builder().message(message).data(data).build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> failedOf(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(ApiResponse.<T>builder().message(message).build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> failedOf(ApiException e) {
        return ResponseEntity.status(e.status)
                .body(ApiResponse.<T>builder().message(e.getMessage()).build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok() {
        return ApiResponse.of(HttpStatus.OK);
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ApiResponse.of(HttpStatus.OK, data);
    }

    public static <T> ResponseEntity<ApiResponse<T>> create(T data) {
        return ApiResponse.of(HttpStatus.CREATED, data);
    }

    public static <T> ResponseEntity<ApiResponse<T>> create() {
        return ApiResponse.of(HttpStatus.CREATED);
    }
}

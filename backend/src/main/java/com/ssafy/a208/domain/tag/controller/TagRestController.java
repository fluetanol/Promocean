package com.ssafy.a208.domain.tag.controller;

import com.ssafy.a208.domain.tag.dto.TagAutocompleteDto;
import com.ssafy.a208.domain.tag.service.TagSearchService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
@Tag(name = "태그", description = "태그 자동완성 API가 담겨있어요")
public class TagRestController {

    private final TagSearchService tagSearchService;

    /**
     * 태그 자동완성 API
     */
    @GetMapping("/autocomplete")
    @Operation(
            summary = "태그 자동완성 API",
            description = "입력한 키워드로 시작하거나 포함하는 태그를 인기순(사용 횟수)으로 반환합니다."
    )
    public ResponseEntity<ApiResponse<List<TagAutocompleteDto>>> autocomplete(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "10")
            @Min(1) @Max(20)
            int size
    ) {
        List<TagAutocompleteDto> suggestions = tagSearchService.autocomplete(keyword, size);
        return ApiResponse.ok(suggestions);
    }
}
package com.ssafy.a208.domain.space.dto.response.folder;

import lombok.Builder;

@Builder
public record FolderInfoRes(
        Long folderId,
        String name,
        String color,
        boolean isPinned) {

}

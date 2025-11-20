package com.ssafy.a208.domain.space.dto.response.folder;

import java.util.List;
import lombok.Builder;

@Builder
public record FolderInfoListRes(List<FolderInfoRes> folders) {

}
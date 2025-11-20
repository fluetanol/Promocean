package com.ssafy.a208.domain.space.dto.response.space;

import com.ssafy.a208.domain.space.dto.response.folder.FolderInfoRes;
import java.util.List;
import lombok.Builder;

@Builder
public record SpaceDetailRes(List<FolderInfoRes> folders) {

}

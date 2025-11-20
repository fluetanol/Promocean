package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.entity.SpaceCover;
import com.ssafy.a208.domain.space.reader.SpaceCoverReader;
import com.ssafy.a208.domain.space.repository.SpaceCoverRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpaceCoverService {

    private final S3Service s3Service;
    private final SpaceCoverReader spaceCoverReader;
    private final SpaceCoverRepository spaceCoverRepository;
    private static final String DEFAULT_SPACE_KEY = "spaces/default-space.png";

    public String createSpaceCover(Space space) {
        FileMetaData fileMetaData = s3Service.getFileMetadata(DEFAULT_SPACE_KEY);
        SpaceCover spaceCover = SpaceCover.builder()
                .space(space)
                .contentType(fileMetaData.contentType())
                .size(fileMetaData.size())
                .filePath(fileMetaData.filePath())
                .originalName(fileMetaData.originalName())
                .build();
        spaceCoverRepository.save(spaceCover);
        return s3Service.getCloudFrontUrl(fileMetaData.filePath());
    }


    public String getSpaceCoverUrl(Space space) {
        SpaceCover spaceCover = spaceCoverReader.getSpaceCoverBySpaceId(space.getId());
        return s3Service.getCloudFrontUrl(spaceCover.getFilePath());
    }

    public void updateSpaceCover(String spaceCoverPath, Space space) {
        SpaceCover spaceCover = spaceCoverReader.getSpaceCoverBySpaceId(space.getId());
        if (!spaceCover.getFilePath().equals(DEFAULT_SPACE_KEY)) {
            s3Service.deleteFile(spaceCover.getFilePath());
        }

        String filePath = extractFileKey(spaceCoverPath);
        FileMetaData metadata = s3Service.getFileMetadata(filePath);
        spaceCover.updateFile(metadata);
    }

    public void deleteSpaceCover(Space space) {
        SpaceCover spaceCover = spaceCoverReader.getSpaceCoverBySpaceId(space.getId());
        if (!spaceCover.getFilePath().equals(DEFAULT_SPACE_KEY)) {
            s3Service.deleteFile(spaceCover.getFilePath());
        }
        spaceCover.deleteSpaceCover();
    }

    private String extractFileKey(String filePath) {
        if (Objects.isNull(filePath) || filePath.isBlank()) {
            return DEFAULT_SPACE_KEY;
        }

        if (!filePath.startsWith("tmp/")) {
            throw new InvalidFilePathException();
        }

        return s3Service.moveObject(filePath, ImageDirectory.SPACES);
    }
}

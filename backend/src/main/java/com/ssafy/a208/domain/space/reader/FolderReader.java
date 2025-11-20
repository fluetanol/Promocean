package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.Folder;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.AlreadyExistFolderException;
import com.ssafy.a208.domain.space.exception.FolderNotFoundException;
import com.ssafy.a208.domain.space.repository.FolderRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FolderReader {

    private final FolderRepository folderRepository;
    private static final String DEFAULT_FOLDER = "모든 프롬프트";

    public Folder getFolderById(Long folderId) {
        return folderRepository.findByIdAndDeletedAtIsNull(folderId)
                .orElseThrow(FolderNotFoundException::new);
    }

    public List<Folder> getFolders(Long spaceId) {
        return folderRepository.findBySpaceIdAndDeletedAtIsNull(spaceId);
    }

    public void checkDuplicatedName(Space space, String name) {
        if (Objects.equals(name, DEFAULT_FOLDER)) {
            throw new AlreadyExistFolderException();
        }
        if (folderRepository.existsBySpaceAndNameAndDeletedAtIsNull(space, name)) {
            throw new AlreadyExistFolderException();
        }
    }
}

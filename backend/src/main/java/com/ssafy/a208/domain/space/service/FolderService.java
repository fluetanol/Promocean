package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.dto.request.FolderReq;
import com.ssafy.a208.domain.space.dto.response.folder.FolderInfoListRes;
import com.ssafy.a208.domain.space.dto.response.folder.FolderInfoRes;
import com.ssafy.a208.domain.space.entity.Folder;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.FolderNotFoundException;
import com.ssafy.a208.domain.space.reader.FolderReader;
import com.ssafy.a208.domain.space.repository.FolderRepository;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final SpaceService spaceService;
    private final FolderReader folderReader;
    private final FolderRepository folderRepository;

    @Transactional
    public FolderInfoRes createFolder(CustomUserDetails userDetails, Long spaceId,
            FolderReq folderReq) {
        Space space = spaceService.getEditableSpace(spaceId, userDetails.memberId());
        folderReader.checkDuplicatedName(space, folderReq.name());

        Folder folder = Folder.builder()
                .name(folderReq.name())
                .color(folderReq.color().toLowerCase())
                .space(space)
                .build();
        folderRepository.save(folder);

        return FolderInfoRes.builder()
                .folderId(folder.getId())
                .name(folder.getName())
                .color(folder.getColor())
                .isPinned(folder.isPinned())
                .build();
    }

    @Transactional(readOnly = true)
    public FolderInfoListRes getFolders(CustomUserDetails userDetails, Long spaceId) {
        spaceService.validateReadableSpace(spaceId, userDetails.memberId());
        List<Folder> folders = folderReader.getFolders(spaceId);
        List<FolderInfoRes> folderInfoRes = folders.stream()
                .map(folder -> FolderInfoRes.builder()
                        .folderId(folder.getId())
                        .name(folder.getName())
                        .color(folder.getColor())
                        .isPinned(folder.isPinned())
                        .build())
                .toList();
        return FolderInfoListRes.builder()
                .folders(folderInfoRes)
                .build();
    }

    @Transactional
    public void updateFolder(CustomUserDetails userDetails, Long spaceId, Long folderId,
            FolderReq folderReq) {
        Space space = spaceService.getEditableSpace(spaceId, userDetails.memberId());
        Folder folder = folderReader.getFolderById(folderId);
        if (Objects.equals(folder.getName(), folderReq.name())) {
            folder.updateColor(folderReq.color());
            return;
        }

        folderReader.checkDuplicatedName(space, folderReq.name());
        folder.updateFolder(folderReq.name(), folderReq.color());
    }

    @Transactional
    public void deleteFolder(CustomUserDetails userDetails, Long spaceId, Long folderId) {
        spaceService.validateEditableSpace(spaceId, userDetails.memberId());
        Folder folder = folderReader.getFolderById(folderId);

        folder.deleteFolder();
    }

    @Transactional
    public FolderInfoRes pinFolder(CustomUserDetails userDetails, Long spaceId, Long folderId) {
        spaceService.validateEditableSpace(spaceId, userDetails.memberId());
        Folder folder = folderReader.getFolderById(folderId);

        folder.updatePin();
        return FolderInfoRes.builder()
                .folderId(folder.getId())
                .name(folder.getName())
                .color(folder.getColor())
                .isPinned(folder.isPinned())
                .build();
    }

    public Folder getEditableFolder(Long spaceId, Long folderId, Long memberId) {
        Folder folder = folderReader.getFolderById(folderId);
        Space space = spaceService.getEditableSpace(spaceId, memberId);

        if (!Objects.equals(folder.getSpace(), space)) {
            throw new FolderNotFoundException();
        }
        return folder;
    }

    public Folder getReadableFolder(Long spaceId, Long folderId, Long memberId) {
        Folder folder = folderReader.getFolderById(folderId);
        Space space = spaceService.getReadableSpace(spaceId, memberId);

        if (!Objects.equals(folder.getSpace(), space)) {
            throw new FolderNotFoundException();
        }
        return folder;
    }

    public void validateEditableFolder(Long spaceId, Long folderId, Long memberId) {
        getEditableFolder(spaceId, folderId, memberId);
    }

    public void validateReadableFolder(Long spaceId, Long folderId, Long memberId) {
        getReadableFolder(spaceId, folderId, memberId);
    }

}

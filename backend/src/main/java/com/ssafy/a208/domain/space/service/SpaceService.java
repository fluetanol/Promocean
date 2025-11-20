package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.space.dto.request.SpaceReq;
import com.ssafy.a208.domain.space.dto.request.SpaceUpdateReq;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfo;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfoListRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceRes;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.space.CannotDeletePersonalSpaceException;
import com.ssafy.a208.domain.space.exception.spacecover.InvalidSpaceCoverRequestException;
import com.ssafy.a208.domain.space.reader.SpaceReader;
import com.ssafy.a208.domain.space.repository.SpaceRepository;
import com.ssafy.a208.global.common.enums.ParticipantRole;
import com.ssafy.a208.global.common.enums.SpaceType;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceReader spaceReader;
    private final MemberReader memberReader;
    private final SpaceRepository spaceRepository;
    private final SpaceCoverService spaceCoverService;
    private final ParticipantService participantService;

    @Transactional
    public Space createPersonalSpace(String userNickname) {
        Space space = Space.builder()
                .name(String.format("%s의 개인 스페이스", userNickname))
                .type(SpaceType.PERSONAL)
                .build();
        return spaceRepository.save(space);
    }

    @Transactional
    public SpaceRes createTeamSpace(CustomUserDetails userDetails, SpaceReq spaceReq) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        Space space = Space.builder()
                .name(spaceReq.name())
                .type(SpaceType.TEAM)
                .build();
        spaceRepository.save(space);

        String coverUrl = spaceCoverService.createSpaceCover(space);

        participantService.saveParticipant(ParticipantRole.OWNER, member, space);
        participantService.saveParticipants(spaceReq.participants(), space);
        return SpaceRes.builder()
                .spaceId(space.getId())
                .name(space.getName())
                .spaceCoverUrl(coverUrl)
                .build();
    }

    @Transactional(readOnly = true)
    public SpaceInfoListRes getTeamSpaces(CustomUserDetails userDetails) {
        List<Participant> participants = participantService.getParticipantsByMemberId(
                userDetails.memberId());
        List<Long> spaceIds = participants.stream()
                .map(participant -> participant.getSpace().getId())
                .toList();
        List<Space> teamSpaces = spaceReader.getTeamSpaces(spaceIds);
        List<SpaceInfo> spaceInfos = teamSpaces.stream()
                .map(teamSpace -> {
                    String coverUrl = spaceCoverService.getSpaceCoverUrl(teamSpace);
                    List<Participant> participantList = participantService
                            .getParticipantsBySpaceId(teamSpace.getId());
                    Participant participant = participantList.stream()
                            .filter(p -> p.getMember().getId().equals(userDetails.memberId()))
                            .findFirst().get();

                    return SpaceInfo.builder()
                            .spaceId(teamSpace.getId())
                            .name(teamSpace.getName())
                            .spaceCoverUrl(coverUrl)
                            .participantCnt(participantList.size())
                            .userRole(participant.getRole().name())
                            .build();
                })
                .toList();
        return SpaceInfoListRes.builder()
                .spaces(spaceInfos)
                .build();
    }

    @Transactional
    public void updateTeamSpace(CustomUserDetails userDetails, Long spaceId,
            SpaceUpdateReq spaceUpdateReq) {
        participantService.validateManageableParticipant(spaceId, userDetails.memberId());
        Space space = spaceReader.getSpaceById(spaceId);
        switch (space.getType()) {
            case TEAM -> {
                if (!Objects.isNull(spaceUpdateReq.name()) && !spaceUpdateReq.name().isBlank()) {
                    space.updateName(spaceUpdateReq.name());
                }
                if (!Objects.isNull(spaceUpdateReq.spaceCoverPath())
                        && !spaceUpdateReq.spaceCoverPath().isBlank()) {
                    spaceCoverService.updateSpaceCover(spaceUpdateReq.spaceCoverPath(), space);
                }
            }
            case PERSONAL -> throw new InvalidSpaceCoverRequestException();
        }
    }

    @Transactional
    public void deleteTeamSpace(CustomUserDetails userDetails, Long spaceId) {
        participantService.validateManageableParticipant(spaceId, userDetails.memberId());
        Space space = spaceReader.getSpaceById(spaceId);
        validateDeletableSpace(space);
        spaceCoverService.deleteSpaceCover(space);

        List<Participant> participants = participantService.getParticipantsBySpaceId(spaceId);
        participants.forEach(Participant::deleteParticipant);
        space.deleteTeamSpace();
    }

    public Space getEditableSpace(Long spaceId, Long memberId) {
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType() == SpaceType.TEAM) {
            participantService.validateEditableParticipant(spaceId, memberId);
        }
        return space;
    }

    public Space getReadableSpace(Long spaceId, Long memberId) {
        Space space = spaceReader.getSpaceById(spaceId);
        if (space.getType() == SpaceType.TEAM) {
            participantService.validateReadableParticipant(spaceId, memberId);
        }
        return space;
    }

    public void validateEditableSpace(Long spaceId, Long memberId) {
        getEditableSpace(spaceId, memberId);
    }

    public void validateReadableSpace(Long spaceId, Long memberId) {
        getReadableSpace(spaceId, memberId);
    }

    private void validateDeletableSpace(Space space) {
        if (space.getType() == SpaceType.PERSONAL) {
            throw new CannotDeletePersonalSpaceException();
        }
    }

}

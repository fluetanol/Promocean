package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.service.ProfileService;
import com.ssafy.a208.domain.space.dto.request.ParticipantListReq;
import com.ssafy.a208.domain.space.dto.request.ParticipantNicknameUpdateReq;
import com.ssafy.a208.domain.space.dto.request.ParticipantReq;
import com.ssafy.a208.domain.space.dto.response.participant.ParticipantInfo;
import com.ssafy.a208.domain.space.dto.response.participant.ParticipantInfoListRes;
import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.InvalidWithdrawalRequestException;
import com.ssafy.a208.domain.space.exception.participant.DuplicatedParticipantException;
import com.ssafy.a208.domain.space.exception.participant.InvalidParticipantDeleteRequestException;
import com.ssafy.a208.domain.space.exception.participant.OwnerConstraintViolationException;
import com.ssafy.a208.domain.space.exception.participant.ParticipantNotFoundException;
import com.ssafy.a208.domain.space.exception.space.SpaceAccessDeniedException;
import com.ssafy.a208.domain.space.reader.ParticipantReader;
import com.ssafy.a208.domain.space.reader.SpaceReader;
import com.ssafy.a208.domain.space.repository.ParticipantRepository;
import com.ssafy.a208.global.common.enums.ParticipantRole;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final SpaceReader spaceReader;
    private final MemberReader memberReader;
    private final ProfileService profileService;
    private final ParticipantReader participantReader;
    private final ParticipantRepository participantRepository;

    @Transactional
    public void saveParticipants(CustomUserDetails userDetails,
            ParticipantListReq participantListReq, Long spaceId) {
        validateManageableParticipant(spaceId, userDetails.memberId());

        List<Participant> participants = participantReader.getParticipantsBySpaceId(spaceId);

        Map<Long, Participant> memberIdToParticipant = participants.stream()
                .collect(Collectors.toMap(p -> p.getMember().getId(), Function.identity()));

        Map<String, Member> emailToMember = memberReader.getMembersById(
                        memberIdToParticipant.keySet().stream().toList()).stream()
                .collect(Collectors.toMap(Member::getEmail, Function.identity()));

        participantListReq.participantReqs().stream()
                .map(ParticipantReq::email)
                .filter(emailToMember::containsKey)
                .findAny()
                .ifPresent(email -> {
                    throw new DuplicatedParticipantException();
                });

        Space space = spaceReader.getSpaceById(spaceId);
        saveParticipants(participantListReq.participantReqs(), space);
    }

    @Transactional
    public void saveParticipants(List<ParticipantReq> participantReqs, Space space) {
        List<Participant> participants = participantReqs.stream().map(
                        participant -> {
                            Member member = memberReader.getMemberByEmail(participant.email());
                            return Participant.builder()
                                    .nickname(member.getNickname())
                                    .role(ParticipantRole.valueOf(participant.role()))
                                    .member(member)
                                    .space(space)
                                    .build();
                        })
                .toList();
        participantRepository.saveAll(participants);
    }

    @Transactional
    public void saveParticipant(ParticipantRole role, Member member, Space space) {
        Participant participant = Participant.builder()
                .nickname(member.getNickname())
                .role(role)
                .member(member)
                .space(space)
                .build();
        participantRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public ParticipantInfoListRes getParticipants(CustomUserDetails userDetails, Long spaceId) {
        List<Participant> participants = getParticipantsBySpaceId(spaceId);
        List<ParticipantInfo> participantInfos = participants.stream().map(
                participant -> {
                    Member member = memberReader.getMemberById(participant.getMember().getId());
                    if (member.getId().equals(userDetails.memberId())) {
                        validateReadableParticipant(spaceId, member.getId());
                    }
                    String profileUrl = profileService.getProfileUrl(member);
                    return ParticipantInfo.builder()
                            .participantId(participant.getId())
                            .nickname(participant.getNickname())
                            .role(participant.getRole())
                            .profileUrl(profileUrl)
                            .email(member.getEmail())
                            .build();
                }
        ).toList();
        return ParticipantInfoListRes.builder()
                .participants(participantInfos)
                .build();
    }

    @Transactional(readOnly = true)
    public List<Participant> getParticipantsByMemberId(Long memberId) {
        return participantReader.getParticipantsByMemberId(memberId);
    }

    @Transactional(readOnly = true)
    public List<Participant> getParticipantsBySpaceId(Long spaceId) {
        return participantReader.getParticipantsBySpaceId(spaceId);
    }

    @Transactional
    public void updateParticipantRole(CustomUserDetails userDetails, ParticipantReq participantReq,
            Long spaceId) {
        validateManageableParticipant(spaceId, userDetails.memberId());
        List<Participant> participants = participantReader.getParticipantsBySpaceId(spaceId);
        Participant participant = participants.stream()
                .filter(p -> p.getMember().getEmail()
                        .equals(participantReq.email()))
                .findFirst()
                .orElseThrow(ParticipantNotFoundException::new);
        if (participant.getRole().canManage() && ParticipantRole.valueOf(participantReq.role())
                .canEdit()) {
            validateMinimumOwner(participants);
        }
        participant.updateParticipantRole(ParticipantRole.valueOf(participantReq.role()));
    }

    @Transactional
    public void updateParticipantNickname(CustomUserDetails userDetails,
            ParticipantNicknameUpdateReq participantNicknameUpdateReq, Long spaceId) {
        validateManageableParticipant(spaceId, userDetails.memberId());
        Participant participant = participantReader.getParticipantBySpaceIdAndMemberId(spaceId,
                userDetails.memberId());
        participant.updateParticipantNickname(participantNicknameUpdateReq.nickname());
    }

    @Transactional
    public void deleteParticipant(CustomUserDetails userDetails, Long spaceId, Long participantId) {
        validateManageableParticipant(spaceId, userDetails.memberId());
        Participant participant = participantReader.getParticipant(participantId);
        if (userDetails.memberId().equals(participant.getMember().getId())) {
            throw new InvalidParticipantDeleteRequestException();
        }
        participant.deleteParticipant();
    }

    @Transactional
    public void withdrawalParticipant(CustomUserDetails userDetails, Long spaceId) {
        validateReadableParticipant(spaceId, userDetails.memberId());
        List<Participant> participants = participantReader.getParticipantsBySpaceId(spaceId);
        Participant participant = participants.stream()
                .filter(p -> p.getMember().getId()
                        .equals(userDetails.memberId()))
                .findFirst()
                .orElseThrow(ParticipantNotFoundException::new);

        if (participants.size() < 2) {
            throw new InvalidWithdrawalRequestException();
        }

        // 탈퇴하는 사람이 OWNER인 경우에만 최소인원 검증 실행
        if (participant.getRole().canManage()) {
            validateMinimumOwner(participants);
        }
        participant.deleteParticipant();
    }

    @Transactional(readOnly = true)
    public void validateManageableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipantBySpaceIdAndMemberId(spaceId,
                memberId);
        validateManagePermission(participant);
    }

    @Transactional(readOnly = true)
    public void validateEditableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipantBySpaceIdAndMemberId(spaceId,
                memberId);
        validateEditPermission(participant);
    }

    @Transactional(readOnly = true)
    public void validateReadableParticipant(Long spaceId, Long memberId) {
        Participant participant = participantReader.getParticipantBySpaceIdAndMemberId(spaceId,
                memberId);
        validateReadPermission(participant);
    }

    private void validateManagePermission(Participant participant) {
        if (!participant.getRole().canManage()) {
            throw new SpaceAccessDeniedException("스페이스 관리 권한이 없는 회원입니다.");
        }
    }

    private void validateEditPermission(Participant participant) {
        if (!participant.getRole().canEdit()) {
            throw new SpaceAccessDeniedException("스페이스 수정 권한이 없는 회원입니다.");
        }
    }

    private void validateReadPermission(Participant participant) {
        if (!participant.getRole().canRead()) {
            throw new SpaceAccessDeniedException("스페이스 조회 권한이 없는 회원입니다.");
        }
    }

    private void validateMinimumOwner(List<Participant> participants) {
        long currentOwners = participants.stream()
                .map(Participant::getRole)
                .filter(ParticipantRole::canManage)
                .count();

        if (currentOwners < 2) {
            throw new OwnerConstraintViolationException();
        }
    }
}

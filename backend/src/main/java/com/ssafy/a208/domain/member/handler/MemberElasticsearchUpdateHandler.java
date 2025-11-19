package com.ssafy.a208.domain.member.handler;

import com.ssafy.a208.domain.board.repository.PostElasticsearchRepositoryImpl;
import com.ssafy.a208.domain.contest.repository.SubmissionElasticsearchRepository;
import com.ssafy.a208.domain.member.event.MemberUpdatedEvent;
import com.ssafy.a208.domain.scrap.repository.ScrapElasticsearchRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class MemberElasticsearchUpdateHandler {

    private final SubmissionElasticsearchRepository submissionElasticsearchRepository;
    private final PostElasticsearchRepositoryImpl postElasticsearchRepository;
    private final ScrapElasticsearchRepositoryImpl scrapElasticsearchRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onMemberUpdated(MemberUpdatedEvent event) {
        submissionElasticsearchRepository.updateMemberInfo(
                event.oldNickname(), event.newNickname(), event.profileFilePath()
        );
        postElasticsearchRepository.updateMemberInfo(
                event.oldNickname(), event.newNickname(), event.profileFilePath()
        );
        scrapElasticsearchRepository.updateMemberInfo(
                event.oldNickname(), event.newNickname(), event.profileFilePath()
        );
    }
}

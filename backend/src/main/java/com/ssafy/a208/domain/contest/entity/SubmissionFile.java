package com.ssafy.a208.domain.contest.entity;

import com.ssafy.a208.global.common.FileEntity;
import com.ssafy.a208.global.image.dto.FileMetaData;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SubmissionFile extends FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submission_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Submission submission;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id", nullable = false)
    private Contest contest;

    @Builder
    public SubmissionFile(String originalName, String filePath, String contentType, Long size,
            Submission submission, Contest contest) {
        super(originalName, filePath, contentType, size);
        this.submission = submission;
        this.contest = contest;
    }

    public void updateSubmissionFile(FileMetaData fileMetaData) {
        this.updateFile(fileMetaData);
    }
}
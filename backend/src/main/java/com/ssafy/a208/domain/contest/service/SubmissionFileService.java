package com.ssafy.a208.domain.contest.service;

import com.ssafy.a208.domain.contest.entity.Submission;
import com.ssafy.a208.domain.contest.entity.SubmissionFile;
import com.ssafy.a208.domain.contest.exception.RequiredFileMissingException;
import com.ssafy.a208.domain.contest.repository.SubmissionFileRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubmissionFileService {

    private final SubmissionFileRepository submissionFileRepository;

    private final S3Service s3Service;

    @Transactional
    public String createSubmissionFile(
            Submission submission
    ) {
        String url = submission.getResult();

        if(Objects.isNull(url) || url.isBlank()) {
            throw new RequiredFileMissingException();
        }

        String movedUrl = s3Service.moveObject(url, ImageDirectory.SUBMISSIONS);
        FileMetaData metaData = s3Service.getFileMetadata(movedUrl);
        SubmissionFile file = SubmissionFile.builder()
                .originalName(metaData.originalName())
                .filePath(movedUrl)
                .contentType(metaData.contentType())
                .size(metaData.size())
                .submission(submission)
                .contest(submission.getContest())
                .build();

        submissionFileRepository.save(file);

        return movedUrl;
    }

    @Transactional(readOnly = true)
    public Optional<SubmissionFile> getSubmissionFile(Long submissionId) {
        return submissionFileRepository.findBySubmission_Id(submissionId);
    }

    @Transactional
    public String updateSubmissionFile(SubmissionFile oldFile, String newFilePath) {
        String movedFilePath = s3Service.moveObject(newFilePath, ImageDirectory.SUBMISSIONS);
        FileMetaData fileMetaData = s3Service.getFileMetadata(movedFilePath);
        oldFile.updateSubmissionFile(fileMetaData);

        return movedFilePath;
    }
}

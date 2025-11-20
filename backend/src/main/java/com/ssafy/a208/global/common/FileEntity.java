package com.ssafy.a208.global.common;


import com.ssafy.a208.global.image.dto.FileMetaData;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Getter
@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileEntity extends BaseEntity {

    @Comment("원본 파일명")
    @Column(nullable = false)
    private String originalName;

    @Comment("파일 경로")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String filePath;

    @Comment("확장자")
    @Column(nullable = false, length = 10)
    private String contentType;

    @Comment("파일 크기")
    @Column(nullable = false)
    private Long size;

    protected FileEntity(String originalName, String filePath, String contentType, Long size) {
        this.originalName = originalName;
        this.filePath = filePath;
        this.contentType = contentType;
        this.size = size;
    }

    public void updateFile(FileMetaData fileMetaData) {
        this.originalName = fileMetaData.originalName();
        this.filePath = fileMetaData.filePath();
        this.contentType = fileMetaData.contentType();
        this.size = fileMetaData.size();
    }

    public void deleteFile() {
        this.delete();
    }
}

package com.ssafy.a208.global.image.utils;

import com.ssafy.a208.global.image.exception.InvalidFilenameException;
import com.ssafy.a208.global.image.exception.UnsupportedExtensionException;
import java.util.Optional;
import java.util.Set;
import org.springframework.stereotype.Component;

@Component
public class FileMetadataUtil {

    private static final Set<String> SUPPORTED_IMAGE_TYPES = Set.of(
            "jpg", "jpeg", "png", "webp"
    );

    public String getContentType(String fileName) {
        String extension = this.getFileExtension(fileName);
        return "image/" + extension;
    }

    public String getFileExtension(String filePath) {
        String extension = Optional.ofNullable(filePath)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(f.lastIndexOf('.') + 1).toLowerCase())
                .orElseThrow(InvalidFilenameException::new);

        if (extension.equals("jpg")) {
            return "jpeg";
        }

        if (!SUPPORTED_IMAGE_TYPES.contains(extension)) {
            throw new UnsupportedExtensionException();
        }
        return extension;
    }

    public String getFileName(String filePath) {
        return filePath.substring(filePath.lastIndexOf('/') + 1);
    }

}

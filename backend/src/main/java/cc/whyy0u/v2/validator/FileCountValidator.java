package cc.whyy0u.v2.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class FileCountValidator implements ConstraintValidator<FileCountLimit, List<MultipartFile>> {

    private int maxCount;
    private long maxSize;

    @Override
    public void initialize(FileCountLimit constraintAnnotation) {
        this.maxCount = constraintAnnotation.maxCount();
        this.maxSize = constraintAnnotation.maxSize();
    }

    @Override
    public boolean isValid(List<MultipartFile> files, ConstraintValidatorContext context) {
        if (files == null) {
            return true;
        }
        if (files.size() > maxCount) {
            return false; 
        }

        for (MultipartFile file : files) {
            if (file != null && file.getSize() > maxSize) {
                return false; 
            }
        }
        return true;
    }
}
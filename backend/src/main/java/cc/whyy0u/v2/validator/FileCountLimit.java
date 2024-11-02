package cc.whyy0u.v2.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;


@Documented
@Constraint(validatedBy = FileCountValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface FileCountLimit {
    int maxCount(); 
    long maxSize() default 2 * 1024 * 1024; 
    String message() default "Нарушение ограничения на количество или размер файлов";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

package cc.whyy0u.v2.controller.user.request;


import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfile {
    
    @Size(min = 30, max = 2000)
    private String description;

    @Max(5 * 1024 * 1024)
    private MultipartFile image;
}

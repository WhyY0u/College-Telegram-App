package cc.whyy0u.v2.controller.user.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddNewsPinCode {
    
    @NotNull
    @Size(min = 6, max = 6)
    String code;
}

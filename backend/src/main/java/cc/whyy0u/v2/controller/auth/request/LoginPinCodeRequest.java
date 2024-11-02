package cc.whyy0u.v2.controller.auth.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginPinCodeRequest {

    @NotNull
    String iin;
    
    @NotNull
    @Size(min = 6, max = 6)
    String pinCode;
}

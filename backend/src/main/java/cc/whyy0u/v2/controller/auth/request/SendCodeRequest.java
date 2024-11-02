package cc.whyy0u.v2.controller.auth.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SendCodeRequest {
    @Email
    @NotNull
    String email;

    @NotNull
    String iin;
}

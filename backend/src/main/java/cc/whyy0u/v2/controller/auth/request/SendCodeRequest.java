package cc.whyy0u.v2.controller.auth.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SendCodeRequest {
    @NotNull
     @Size(min = 4, max = 4)
    String pin;

    @NotNull
    String iin;
}

package cc.whyy0u.v2.controller.auth.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IsRegisterRequest {
    @NotNull
    String iin;
}

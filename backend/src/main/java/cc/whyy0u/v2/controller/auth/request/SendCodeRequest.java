package cc.whyy0u.v2.controller.auth.request;

import lombok.Data;

@Data
public class SendCodeRequest {
    String email;
    String iin;
}

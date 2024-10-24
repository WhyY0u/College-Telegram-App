package cc.whyy0u.v2.controller.auth.request;

import lombok.Data;

@Data
public class LoginPinCodeRequest {
    String iin;
    String pinCode;
}

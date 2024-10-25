package cc.whyy0u.v2.security.jwt.response;

import lombok.Data;

@Data
public class SignInResponce {
    String token; 
    boolean isRegister;

    public SignInResponce(String token, boolean isRegister) {
        this.token = token;
        this.isRegister = isRegister;
    }
}

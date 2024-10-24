package cc.whyy0u.v2.security.jwt.response;

import lombok.Data;

@Data
public class AuthResponse {
    String refreshToken;
    String tempToken; 

    public AuthResponse(String refreshToken, String tempToken) {
        this.refreshToken = refreshToken;
        this.tempToken = tempToken;
    }
}

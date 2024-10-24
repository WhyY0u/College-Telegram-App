package cc.whyy0u.v2.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.controller.auth.request.AddPinCodeRequest;
import cc.whyy0u.v2.controller.auth.request.LoginPinCodeRequest;
import cc.whyy0u.v2.details.CustomUserDetails;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.security.jwt.response.AuthResponse;
import cc.whyy0u.v2.service.user.UserService;

@Service
public class AuthenticationService {

    private final UserService userService;

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(UserService userService, 
                                 JwtService jwtService, 
                                 PasswordEncoder passwordEncoder, 
                                 AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    
    public AuthResponse signUp(AddPinCodeRequest request) {
        UserEntity entity = userService.findByIIN(request.getIin()); 
        String jwtRefresh = jwtService.generateTokenRefresh(new CustomUserDetails(entity));
        String jwtTemp = jwtService.generateTokenTemp(new CustomUserDetails(entity));
        entity.setJwtToken(jwtRefresh); 
        entity.setPinCode(passwordEncoder.encode(request.getNewPinCode())); 
        userService.saveEntity(entity);
        return new AuthResponse(jwtRefresh, jwtTemp); 
    }

    public AuthResponse signIn(LoginPinCodeRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getIin(),
                request.getPinCode()
        ));
        UserEntity entity = userService.findByIIN(request.getIin()); 
        String jwtTemp = jwtService.generateTokenTemp(new CustomUserDetails(entity));
        return new AuthResponse(entity.getJwtToken(), jwtTemp); 
    }
}
package cc.whyy0u.v2.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.controller.auth.request.LoginPinCodeRequest;
import cc.whyy0u.v2.details.CustomUserDetails;
import cc.whyy0u.v2.entity.user.Device;
import cc.whyy0u.v2.entity.user.DeviceType;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.security.jwt.response.SignInResponce;
import cc.whyy0u.v2.service.user.UserService;

@Service
public class AuthenticationService {

    private final UserService userService;

    private final JwtService jwtService;

    
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(UserService userService, 
                                 JwtService jwtService, 
                                 AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public SignInResponce signIn(LoginPinCodeRequest request, DeviceType os, String ipAddress) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getIin(),
                request.getPinCode()
        ));
        UserEntity entity = userService.findByIIN(request.getIin()); 
        String jwt = jwtService.generateToken(new CustomUserDetails(entity));
        entity.getTokenDeviceMap().put(jwt, new Device(ipAddress, os));
        return new SignInResponce(jwt, entity.isRegistered()); 
    }
}
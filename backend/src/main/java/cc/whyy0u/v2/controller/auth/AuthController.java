package cc.whyy0u.v2.controller.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cc.whyy0u.v2.controller.auth.request.AddPinCodeRequest;
import cc.whyy0u.v2.controller.auth.request.LoginPinCodeRequest;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.security.jwt.AuthenticationService;
import cc.whyy0u.v2.security.jwt.JwtService;
import cc.whyy0u.v2.security.jwt.response.AuthResponse;
import cc.whyy0u.v2.service.user.UserService;

@RestController
@RequestMapping("/api/v2/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/isRegister")
    public ResponseEntity<?> isRegister(@RequestBody AddPinCodeRequest request) {
        UserEntity entity = userService.findByIIN(request.getIin());
        if(entity != null) {
          if(entity.isRegistered()) {
            return ResponseEntity.status(HttpStatus.OK).body("Yes");
          } else {
            return ResponseEntity.status(HttpStatus.OK).body("No");
          }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Пользователь не найден");
    }

    @PostMapping("/isValidToken")
    public ResponseEntity<?> isTokenValid(@RequestBody AddPinCodeRequest request) {
        jwtService.isTokenValid(null, null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Пользователь не найден");
    }

    @PostMapping("/login/pin")
    public ResponseEntity<?> LoginPinCode(@RequestBody LoginPinCodeRequest request) {
        AuthResponse response = authenticationService.signIn(request);
        if(response == null) ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        return ResponseEntity.ok(response);
    }
    
}

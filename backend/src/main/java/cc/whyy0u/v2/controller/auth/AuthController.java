package cc.whyy0u.v2.controller.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cc.whyy0u.v2.controller.auth.request.IsRegisterRequest;
import cc.whyy0u.v2.controller.auth.request.LoginPinCodeRequest;
import cc.whyy0u.v2.controller.auth.request.SendCodeRequest;
import cc.whyy0u.v2.entity.user.DeviceType;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.security.jwt.AuthenticationService;
import cc.whyy0u.v2.security.jwt.response.SignInResponce;
import cc.whyy0u.v2.service.email.EmailService;
import cc.whyy0u.v2.service.user.UserService;
import cc.whyy0u.v2.utils.OSUtils;
import cc.whyy0u.v2.utils.RandomUtils;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v2/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    EmailService email;

    @PostMapping("/check/register")
    public ResponseEntity<?> isRegister(@RequestBody IsRegisterRequest request) {
       UserEntity userEntity =  userService.findByIIN(request.getIin());
       if(userEntity != null) {
        if(userEntity.isRegistered()) {
           return ResponseEntity.ok("No");
        } else {
           return ResponseEntity.ok("Yes");
        }
    }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Пользватель не найден");
    }

    @PostMapping("/generateCode")
    public ResponseEntity<?> generateCode(@RequestBody SendCodeRequest request) {
         UserEntity userEntity =  userService.findByIIN(request.getIin());
         if(userEntity != null) {
            if(userEntity.isRegistered()) {
                String code = RandomUtils.generateRandomPinCode(6);
                String htmlBody = "<h1>Привет!</h1><p>Это <strong>тестовое</strong> письмо с HTML форматированием.</p>";
                try {
                    email.sendHtmlEmail(request.getEmail(), "Test", htmlBody);
                    userEntity.setPinCode(encoder.encode(code));
                    userService.saveEntity(userEntity);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }

            } else {
               return ResponseEntity.ok("Yes");
            }
        }
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Пользватель не найден");
     }

    @PostMapping("/login/pin")
    public ResponseEntity<?> loginPinCode(@RequestBody LoginPinCodeRequest request,  HttpServletRequest httpRequest) {
        if(userService.findByIIN(request.getIin()).getPinCode() == null && userService.findByIIN(request.getIin()).getPinCode().length() == 0) {
          return ResponseEntity.badRequest().body("Пользватель еще не зарегистрировался.");
        }
        String userAgent = httpRequest.getHeader("User-Agent");
        DeviceType os = OSUtils.getOperatingSystem(userAgent);
        String ipAddress = httpRequest.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty()) {
            ipAddress = httpRequest.getRemoteAddr();
        }
        SignInResponce response = authenticationService.signIn(request, os, ipAddress);
        if(response == null) ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        return ResponseEntity.ok(response);
    }

}

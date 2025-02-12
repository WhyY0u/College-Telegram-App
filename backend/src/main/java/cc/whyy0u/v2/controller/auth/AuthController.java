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
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.security.jwt.AuthenticationService;
import cc.whyy0u.v2.security.jwt.response.SignInResponce;
import cc.whyy0u.v2.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v2/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/ping")
    public String getPing() {
        return "ok";
    }
    

    @PostMapping("/check/register")
    public ResponseEntity<?> isRegister(@Valid @RequestBody IsRegisterRequest request) {
       UserEntity userEntity =  userService.findByIIN(request.getIin());
       if(userEntity != null) {
        if(userEntity.isRegistered()) {
           return ResponseEntity.ok("Yes");
        } else {
           return ResponseEntity.ok("No");
        }
    }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Походу вы не являетесь студентом коледжа.");
    }

    @PostMapping("/generateCode")
    public ResponseEntity<?> generateCode(@Valid @RequestBody SendCodeRequest request) {
         UserEntity userEntity =  userService.findByIIN(request.getIin());
         if(userEntity != null) {
            if(userEntity.isRegistered()) {
                return ResponseEntity.badRequest().body("Пользвателю уже был сгенирирован код.");
            } else {
                   userEntity.setPinCode(encoder.encode(request.getPin()));
                   userEntity.setRegistered(true);
                   userService.saveEntity(userEntity);
                   return ResponseEntity.ok("ok");
            }
        }
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Походу вы не являетесь студентом коледжа.");
     }

    @PostMapping("/login/pin")
    public ResponseEntity<?> loginPinCode(@Valid @RequestBody LoginPinCodeRequest request,  HttpServletRequest httpRequest) {
        UserEntity entity = userService.findByIIN(request.getIin());
        if(entity == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Походу вы не являетесь студентом коледжа.");
        if(entity.getPinCode() == null  || entity.getPinCode().length() == 0) {
          return ResponseEntity.badRequest().body("Пользватель еще не зарегистрировался.");
        }

        SignInResponce response = authenticationService.signIn(request);
        if(response == null) ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        return ResponseEntity.ok(response);
    }

}

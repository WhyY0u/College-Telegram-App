package cc.whyy0u.v2.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cc.whyy0u.v2.controller.user.request.AddNewsPinCode;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.service.user.UserService;

@RestController
@RequestMapping("/api/v2/user")
public class UserController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

     @Autowired
    public UserController(UserService userService, 
                                 PasswordEncoder passwordEncoder
                                 ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/:id")
    public ResponseEntity<?> getUser(@RequestHeader Long id) {
        UserEntity entity = userService.getCurrentUser();
        return ResponseEntity.ok(entity);
    }

    @PostMapping("/settings/newPin")
    public ResponseEntity<?> addNewPinCode(@RequestBody AddNewsPinCode request) {
        UserEntity entity = userService.getCurrentUser();
        entity.setPinCode(passwordEncoder.encode(request.getCode()));
        userService.saveEntity(entity);
        return ResponseEntity.status(HttpStatus.OK).body("Ok");
    }
    
}

package cc.whyy0u.v2.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/user")
public class UserController {

    @GetMapping("/:id")
    public ResponseEntity<?> getUser(@RequestHeader Long id) {
       
        return ResponseEntity.ok("");
    }
    
}

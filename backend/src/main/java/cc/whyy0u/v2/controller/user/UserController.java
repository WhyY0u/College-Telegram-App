package cc.whyy0u.v2.controller.user;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cc.whyy0u.v2.controller.user.request.AddChatId;
import cc.whyy0u.v2.controller.user.request.AddNewsPinCode;
import cc.whyy0u.v2.controller.user.request.UpdateProfile;
import cc.whyy0u.v2.controller.user.response.GetProfile;
import cc.whyy0u.v2.controller.user.response.GetTicketUserResponse;
import cc.whyy0u.v2.entity.profile.ProfileEntity;
import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.entity.user.Role;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.service.profile.ProfileService;
import cc.whyy0u.v2.service.ticket.TicketService;
import cc.whyy0u.v2.service.user.UserService;
import cc.whyy0u.v2.utils.FileUtils;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/v2/user")
public class UserController {

    private final UserService userService;

    private final ProfileService profileService;

    private final PasswordEncoder passwordEncoder;

    private final TicketService ticketService;

    
     @Autowired
    public UserController(UserService userService, 
                                 PasswordEncoder passwordEncoder,
                                 TicketService ticketService,
                                 ProfileService profileService
                                 ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.ticketService = ticketService;
        this.profileService = profileService;
    }

    @PostMapping("/settings/newPin")
    public ResponseEntity<?> addNewPinCode(@Valid @RequestBody AddNewsPinCode request) {
        UserEntity entity = userService.getCurrentUser();
        entity.setPinCode(passwordEncoder.encode(request.getCode()));
        userService.saveEntity(entity);
        return ResponseEntity.status(HttpStatus.OK).body("Ok");
    }
    @GetMapping("/ticket/{id}")
    public ResponseEntity<?> getMethodName(@PathVariable Long id) throws IOException {
         TicketEntity ticket  = ticketService.findTicketById(id);
         if(ticket == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
         }
         UserEntity user = userService.getCurrentUser();
         if(ticket.getCreatorId().equals(user.getId()) || user.getRole() == Role.Administrator) {
            UserEntity moderator = null;
            if(ticket.getModeratorId() != null) moderator =  userService.findById(ticket.getModeratorId());
            
            GetTicketUserResponse ticketUserResponse = new GetTicketUserResponse(user, moderator, ticket);
            return ResponseEntity.status(HttpStatus.OK).body(ticketUserResponse);
         }
         return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
    }

   @GetMapping("/profile")
   public ResponseEntity<?> getProfile() throws IOException {
       UserEntity userEntity = userService.getCurrentUser();
       ProfileEntity profileEntity = profileService.profileByUserId(userEntity.getId());
       GetProfile getProfile = new GetProfile();
       if(profileEntity.getImage() != null && profileEntity.getImage().length() > 0) getProfile.setImage(FileUtils.getImage(profileEntity.getImage()));
       getProfile.setDescription(profileEntity.getDescription());
       return ResponseEntity.ok().body(getProfile);
   }
   
   @PostMapping("/addRole")
   public  ResponseEntity<?> postMethodName() {
       UserEntity entity = userService.getCurrentUser();
       entity.setRole(Role.Administrator);
       userService.saveEntity(entity);
       return  ResponseEntity.ok().body("ok");
   }
   
    @PutMapping("/updprofile")
    public ResponseEntity<?> updateProfile(@Valid @ModelAttribute UpdateProfile request) throws IOException {
        UserEntity user = userService.getCurrentUser();
         ProfileEntity profileEntity = profileService.profileByUserId(user.getId());

         if (request.getImage() != null && !request.getImage().isEmpty()) {
            if(profileEntity.getImage() != null) {
                FileUtils.deleteImage(profileEntity.getImage());
            }
         profileEntity.setImage(FileUtils.saveImage(request.getImage()));
         }

         if (request.getDescription() != null) {
            profileEntity.setDescription(request.getDescription());
         }
    
        profileService.saveProfile(profileEntity);
        return ResponseEntity.ok().body("ok");
}
   

    @PostMapping("/addChatId")
    public ResponseEntity<?> addChatId(@Valid @RequestBody AddChatId chatId) {
        UserEntity user = userService.getCurrentUser();
        user.setChatId(chatId.getChatId());
        userService.saveEntity(user);
        return ResponseEntity.ok().body("ok");
    }
    
}

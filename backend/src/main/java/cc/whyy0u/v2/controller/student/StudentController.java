package cc.whyy0u.v2.controller.student;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cc.whyy0u.v2.controller.student.request.CreateTicketRequest;
import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.entity.ticket.TicketStatus;
import cc.whyy0u.v2.service.ticket.TicketService;
import cc.whyy0u.v2.service.user.UserService;
import cc.whyy0u.v2.utils.FileUtils;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/student")
public class StudentController {
    
    @Autowired
    TicketService ticketService;

    @Autowired
    UserService userService;

   @PostMapping("/createTicket")
    public ResponseEntity<?> getUser(@Valid @ModelAttribute CreateTicketRequest request) throws IOException {
        
         TicketEntity ticket = new TicketEntity(request);
         ticket.setCreatorId(userService.getCurrentUser().getId());
         ticket.setStatus(TicketStatus.Expectation);
         if(request.getImage() != null) {
            long maxSize = 5 * 1024 * 1024;
            if(request.getImage().getSize() > maxSize) return ResponseEntity.badRequest().body("Большой размер файла, файл должен быть не больше 5МБ.");
            ticket.setImages(FileUtils.saveImage(request.getImage()));
         }
         ticketService.saveTicket(ticket);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/getMyTicket")
    public ResponseEntity<?> getMyTicket() {
        return ResponseEntity.ok(ticketService.convertToResponseList(ticketService.getTicketByCreatorId(userService.getCurrentUser().getId())));
    }

}

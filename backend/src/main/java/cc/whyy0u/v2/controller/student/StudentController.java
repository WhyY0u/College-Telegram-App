package cc.whyy0u.v2.controller.student;

import java.io.IOException;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cc.whyy0u.v2.controller.administrator.request.UpdateTicket;
import cc.whyy0u.v2.controller.administrator.response.GetAllTicketsAdministrator;
import cc.whyy0u.v2.controller.student.request.CreateTicketRequest;
import cc.whyy0u.v2.controller.student.response.TicketResponseAdmin;
import cc.whyy0u.v2.controller.student.response.TicketResponseUser;
import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.entity.ticket.TicketStatus;
import cc.whyy0u.v2.entity.ticket.TicketType;
import cc.whyy0u.v2.entity.user.Role;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.service.ticket.TicketService;
import cc.whyy0u.v2.service.user.UserService;
import cc.whyy0u.v2.utils.TicketUtils;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/ticket")
public class StudentController {
    
    @Autowired
    TicketService ticketService;

    @Autowired
    UserService userService;

   @PostMapping("/createTicket")
    public ResponseEntity<?> createTicket(@Valid @RequestBody CreateTicketRequest request) throws IOException {
         TicketEntity ticket = new TicketEntity(request);
         ticket.setCreatorId(userService.getCurrentUser().getId());
         ticket.setStatus(TicketStatus.Expectation);
         ticketService.saveTicket(ticket);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/deleteTicket/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) throws IOException {
        TicketEntity entity = ticketService.findTicketById(id);
        if(!userService.getCurrentUser().getId().equals(entity.getCreatorId())) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Куда мы лезим боже");
        if(entity != null) {
            ticketService.deleteTicket(id);
           return ResponseEntity.ok("ok");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
    }


    @PostMapping("/check")
    public ResponseEntity<?> checkToken() {
        return ResponseEntity.ok(userService.getCurrentUser().getRole());
    }
    

    @Autowired
    PasswordEncoder encoder;

   
    @PostMapping("/info")
    public ResponseEntity<?> getMyInfo() {
        HashMap<String, String> list = new HashMap<String, String>();
        UserEntity user = userService.getCurrentUser();
        list.put("Group", user.getGroup());
        String fullName = user.getSurname() + " " + user.getName() + " " + user.getPatronymic();
        list.put("Name", fullName);
        return ResponseEntity.ok(list);
    }
    
    @GetMapping("/search")
    public ResponseEntity<?> searchTicket(@RequestParam String search,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "default") String sort) {
            if(userService.getCurrentUser().getRole() == Role.Student) {
                 Page<TicketEntity> ticketPage = ticketService.searchTicket(userService.getCurrentUser().getId(), page, size, search, sort);
                 return ResponseEntity.ok(ticketService.convertToResponseList(ticketPage));
            } else if(userService.getCurrentUser().getRole() == Role.Administrator) {
                    Page<TicketEntity> tickets = ticketService.searchTicketAll(page, size, search, sort);
                    int totalPages = tickets.getTotalPages();
                    GetAllTicketsAdministrator all = new GetAllTicketsAdministrator();
                    all.setTicketsResponse(ticketService.convertToResponseConfidant(tickets));
                    all.setCurrentPage(page);
                    all.setTotalPages(totalPages);
                    all.setRole(Role.Administrator);
                return ResponseEntity.ok(all);
          }
        return ResponseEntity.notFound().build();
    }
    

    @GetMapping("/tickets")
    public ResponseEntity<?> getTickets(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "default") String sort) {
        if(userService.getCurrentUser().getRole() == Role.Student) {
          Page<TicketEntity> ticketPage = ticketService.getTicketByCreatorId(
            userService.getCurrentUser().getId(), page, size, sort
        );
         UserEntity user = userService.getCurrentUser();
        return ResponseEntity.ok(ticketService.convertToResponseList(ticketPage));
        } else if(userService.getCurrentUser().getRole() == Role.Administrator) {

        Pageable pageable = PageRequest.of(page, size);
        Page<TicketEntity> tickets = null;

        switch (sort) {
            case "default", "status" -> tickets = ticketService.findAllByStatus(pageable);
            case "type" -> tickets = ticketService.findAllByType(pageable);
            default -> tickets = ticketService.findAllByStatus(pageable); 
        }
      
        int totalPages = tickets.getTotalPages();

        GetAllTicketsAdministrator all = new GetAllTicketsAdministrator();
        all.setTicketsResponse(ticketService.convertToResponseConfidant(tickets));
        all.setCurrentPage(page);
        all.setTotalPages(totalPages);
        all.setRole(Role.Administrator);
         return ResponseEntity.ok(all);
    }
    return ResponseEntity.notFound().build();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTicket(@PathVariable Long id) {
      TicketEntity ticket = ticketService.findTicketById(id);
       if(ticket == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            UserEntity user = userService.findById(ticket.getCreatorId());
        if(userService.getCurrentUser().getRole() == Role.Student) {
            if(!ticket.getCreatorId().equals(userService.getCurrentUser().getId())) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Куда мы лезим боже");
            TicketResponseUser reponse = new TicketResponseUser();
            reponse.setComment(ticket.getComment());
            reponse.setDescription(ticket.getDescription());
            reponse.setGroup(user.getGroup());
            reponse.setHeader(ticket.getName());
            reponse.setStatus(TicketUtils.getStatus(ticket.getStatus()));
            reponse.setUsertype("User");
            reponse.setType(ticket.getType() != TicketType.Offer ? "Жалоба" : "Предложения");
            reponse.setId(ticket.getId());
            return ResponseEntity.ok(reponse);
        } else if(userService.getCurrentUser().getRole() == Role.Administrator) {
               TicketResponseAdmin rsp = new TicketResponseAdmin();
               rsp.setComment(ticket.getComment());
               rsp.setDescription(ticket.getDescription());
               rsp.setGroup(user.getGroup());
               rsp.setHeader(ticket.getName());
               rsp.setType(ticket.getType() != TicketType.Offer ? "Жалоба" : "Предложения");
               String fullName = user.getSurname() + " " + user.getName() + " " + user.getPatronymic();
               rsp.setUserName(fullName);
               rsp.setUsertype("Admin");
               rsp.setId(ticket.getId());
               return ResponseEntity.ok(rsp);
        }
        return ResponseEntity.ok("ok");
    }
    

    @PostMapping("/update/ticket")
    public ResponseEntity<?> updateTicket(@Valid @RequestBody UpdateTicket updateTicket) {
        if(userService.getCurrentUser().getRole() != Role.Administrator) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
           TicketEntity ticketEntity = ticketService.findTicketById(updateTicket.getTicketId());
           UserEntity user = userService.getCurrentUser();
           if(ticketEntity != null) {
              if(updateTicket.getComment() != null) ticketEntity.setComment(updateTicket.getComment());
              if(updateTicket.getStatus() != null) ticketEntity.setStatus(TicketUtils.getStatusFromString(updateTicket.getStatus()));
              ticketEntity.setModeratorId(user.getId());
              ticketService.saveTicket(ticketEntity);
              return ResponseEntity.ok("ok");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
    }
}

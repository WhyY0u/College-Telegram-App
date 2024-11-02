package cc.whyy0u.v2.controller.administrator;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cc.whyy0u.v2.controller.administrator.request.AddEvent;
import cc.whyy0u.v2.controller.administrator.request.AddNews;
import cc.whyy0u.v2.controller.administrator.request.DeleteTicketRequest;
import cc.whyy0u.v2.controller.administrator.request.JoinAdministrator;
import cc.whyy0u.v2.controller.administrator.request.UpdateTicket;
import cc.whyy0u.v2.controller.administrator.response.GetAllTicketsAdministrator;
import cc.whyy0u.v2.entity.news.EventEntity;
import cc.whyy0u.v2.entity.news.NewsEntity;
import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.entity.user.Role;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.service.bot.TelegramService;
import cc.whyy0u.v2.service.news.NewsService;
import cc.whyy0u.v2.service.ticket.TicketService;
import cc.whyy0u.v2.service.user.UserService;
import cc.whyy0u.v2.utils.FileUtils;
import cc.whyy0u.v2.utils.RandomUtils;
import jakarta.validation.Valid;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/api/v2/administrator")
public class AdministratorController {
    
    @Autowired
    TicketService ticketService;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    TelegramService telegramService;


    @Autowired
    NewsService newsService;

    @GetMapping("/tickets")
    public ResponseEntity<?> getTickets(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "default") String sort) {

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
        return ResponseEntity.ok(all);
    }

    @PostMapping("/update/ticket")
    public ResponseEntity<?> updateTicket(@Valid @RequestBody UpdateTicket updateTicket) {
           TicketEntity ticketEntity = ticketService.findTicketById(updateTicket.getTicketId());
           UserEntity user = userService.getCurrentUser();
           UserEntity creator = userService.findById(ticketEntity.getCreatorId());
           if(ticketEntity != null) {
              if(updateTicket.getComment() != null) ticketEntity.setComment(updateTicket.getComment());
              if(updateTicket.getStatus() != null) ticketEntity.setStatus(updateTicket.getStatus());
              ticketEntity.setModeratorId(user.getId());
               
              ticketService.saveTicket(ticketEntity);
              if(creator.getChatId() != null) {
              telegramService.sendChat(creator.getChatId(), "На вашь тикет: " + ticketEntity.getName() + " только что ответили");
              }
              return ResponseEntity.ok("ok");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
    }

    @PostMapping("/addNews")
    public ResponseEntity<?> addNews(@Valid @ModelAttribute AddNews request) throws IOException {
        NewsEntity news = new NewsEntity();
        news.setDescription(request.getDescription());
        news.setName(request.getName());
        final ArrayList<String> images = new ArrayList<>();
        for(MultipartFile file : request.getImages()) {
           images.add(FileUtils.saveImage(file));
        }
        news.setImages(images);
        newsService.saveNews(news);
        for(UserEntity user : userService.findAllUsers()) {
           if(user.getChatId() != null) {
            telegramService.sendChat(user.getChatId(), "*Появилось новая новость!!*");
            }
        }
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/addEvent")
    public ResponseEntity<?> addEvent(@Valid @ModelAttribute AddEvent request) throws IOException {
        EventEntity event = new EventEntity();
        event.setDescription(request.getDescription());
        event.setName(request.getName());
        event.setPlace(request.getPlace());
        event.setStart(request.getStart());
        if(request.getImages() != null && request.getImages().size() > 0) {
        final ArrayList<String> images = new ArrayList<>();
        for(MultipartFile file : request.getImages()) {
           images.add(FileUtils.saveImage(file));
        }
        event.setImages(images);
        }
        newsService.saveEvent(event);
        for(UserEntity user : userService.findAllUsers()) {
            if(user.getChatId() != null) {
             telegramService.sendChat(user.getChatId(), "*Появилось новое мероприятие!!*");
             }
         }
        return ResponseEntity.ok("ok");
    }
    

    @GetMapping("/serchTicket")
    public ResponseEntity<?> searchTicket(@RequestParam("name") String name) {
        return ResponseEntity.ok(ticketService.convertToResponseList(ticketService.findByNameContaining(name)));
    }
    
    
    @GetMapping("/getallAdministrator")
    public ResponseEntity<?> getAllAdministrator() {
        return  ResponseEntity.ok(userService.convertToAllAdministratorList(userService.findAllAdministrators()));
    }

    @PostMapping("/joinAdministrator")
    public ResponseEntity<?> joinAdministrator(@Valid @RequestBody JoinAdministrator request) {
        UserEntity mb = userService.findByIIN(request.getIin());
        if(mb != null) {
            mb.setRole(Role.Administrator);
            userService.saveEntity(mb);
            return ResponseEntity.ok("ok");
        }
         UserEntity entity = new UserEntity();
         entity.setName(request.getName());
         entity.setRole(Role.Administrator);
         entity.setIin(request.getIin());
         entity.setPatronymic(request.getPatronymic());
         entity.setRegistered(false);
         entity.setSurname(request.getSurname());
         String pin = RandomUtils.generateRandomPinCode(6);
         entity.setPinCode(encoder.encode(pin));
         userService.saveEntity(entity);
        return ResponseEntity.ok(pin);
    }
    

    @DeleteMapping("/deleteTicket")
    public ResponseEntity<?> deleteTicket(@RequestBody DeleteTicketRequest request) throws IOException {
        TicketEntity entity = ticketService.findTicketById(request.getId());
        if(entity != null) {
            if(entity.getImages() != null ) {
                FileUtils.deleteImage(entity.getImages());
            }
            ticketService.deleteTicket(request.getId());
           return ResponseEntity.ok("ok");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
    }

}

package cc.whyy0u.v2.service.ticket;

import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.entity.ticket.TicketType;
import cc.whyy0u.v2.entity.user.Role;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.repository.ticket.TicketRepository;
import cc.whyy0u.v2.repository.ticket.response.GetTicketResponseAll;
import cc.whyy0u.v2.repository.ticket.response.GetTicketsResponse;
import cc.whyy0u.v2.service.user.UserService;
import cc.whyy0u.v2.utils.TicketUtils;

@Service
public class TicketService {

    @Autowired
    TicketRepository repository;

    @Autowired
    UserService userService;


    public void saveTicket(TicketEntity entity) {
       repository.save(entity);
    }

    public void deleteTicket(Long id) {
        repository.deleteById(id);
    }

    public ArrayList<TicketEntity> findByNameContaining(String name) {
        return repository.findByNameContaining(name);
    }

    public Page<TicketEntity> getTicketByCreatorId(Long creatorId, int page, int size, String sort) {
        Pageable pageable = PageRequest.of(page, size);  
        return repository.findByCreatorId(creatorId, sort, pageable);
    }

    public Page<TicketEntity> searchTicket(Long creatorId, int page, int size, String search, String sort) {
        Pageable pageable = PageRequest.of(page, size);  
        return repository.searchByNameOrDescriptionAndCreatorIdWithSort(search, creatorId, sort, pageable);
    }

    public Page<TicketEntity> searchTicketAll(int page, int size, String search, String sort) {
        Pageable pageable = PageRequest.of(page, size);  
        return repository.searchByNameOrDescriptionWithSort(search, sort, pageable);
    }


    public TicketEntity findTicketById(Long id) {
        return repository.findById(id).orElse(null);
    }
    public Page<TicketEntity> findAllByStatus(Pageable pageable) {
        return repository.findAllOrdered(pageable);
    }
    public Page<TicketEntity> findAllByType(Pageable pageable) {
        return repository.findAllOrderedByType(pageable);
    }
    public GetTicketResponseAll convertToResponseList(Page<TicketEntity> ticketEntities) {;
        GetTicketResponseAll rsp = new GetTicketResponseAll();
        rsp.setUse_role(Role.Student);
        rsp.setReponse(ticketEntities.stream()
            .map(ticket -> {
                UserEntity user = userService.findById(ticket.getCreatorId());
                String fullName = user.getSurname() + " " + user.getName() + " " + user.getPatronymic();
                GetTicketsResponse response = new GetTicketsResponse();
                response.setName(ticket.getName());
                response.setStatus(TicketUtils.getStatus(ticket.getStatus()));
                response.setType(ticket.getType() == TicketType.Offer ? "Предложение" : "Жалоба");
                response.setDescription(ticket.getDescription());
                response.setId(ticket.getId());
                response.setUserGroup(user.getGroup());
                response.setUserName(fullName);
                return response;
            })
            .collect(Collectors.toCollection(ArrayList::new)));
            rsp.setCurrentPage(ticketEntities.getNumber()); 
            rsp.setTotalPages(ticketEntities.getTotalPages()); 
            rsp.setTotalItems(ticketEntities.getTotalElements());
        return rsp;
    }

    public ArrayList<GetTicketsResponse> convertToResponseConfidant(Page<TicketEntity> tickets) {
        return tickets.stream()
            .map(ticket -> {
                UserEntity user = userService.findById(ticket.getCreatorId());
                String fullName = user.getSurname() + " " + user.getName() + " " + user.getPatronymic();
                GetTicketsResponse response = new GetTicketsResponse();
                response.setName(ticket.getName());
                response.setStatus(TicketUtils.getStatus(ticket.getStatus()));
                response.setType(ticket.getType() == TicketType.Offer ? "Предложение" : "Жалоба");
                response.setDescription(ticket.getDescription());
                response.setId(ticket.getId());
                response.setUserGroup(user.getGroup());
                response.setUserName(fullName);
                return response;
            })
            .collect(Collectors.toCollection(ArrayList::new));
        }
}

package cc.whyy0u.v2.service.ticket;

import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.repository.ticket.TicketRepository;
import cc.whyy0u.v2.repository.ticket.response.GetTicketsResponse;

@Service
public class TicketService {

    @Autowired
    TicketRepository repository;


    public void saveTicket(TicketEntity entity) {
       repository.save(entity);
    }

    public void deleteTicket(Long id) {
        repository.deleteById(id);
    }

    public ArrayList<TicketEntity> findByNameContaining(String name) {
        return repository.findByNameContaining(name);
    }

    public ArrayList<TicketEntity> getTicketByCreatorId(Long id) {
        return repository.findByCreatorId(id);
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
    public ArrayList<GetTicketsResponse> convertToResponseList(ArrayList<TicketEntity> ticketEntities) {
    return ticketEntities.stream()
        .map(ticket -> {
            GetTicketsResponse response = new GetTicketsResponse();
            response.setName(ticket.getName());
            response.setStatus(ticket.getStatus());
            response.setType(ticket.getType());
            response.setId(ticket.getId());
            return response;
        })
        .collect(Collectors.toCollection(ArrayList::new));
    }

    public ArrayList<GetTicketsResponse> convertToResponseConfidant(Page<TicketEntity> tickets) {
        return tickets.stream()
            .map(ticket -> {
                GetTicketsResponse response = new GetTicketsResponse();
                response.setName(ticket.getName());
                response.setStatus(ticket.getStatus());
                response.setType(ticket.getType());
                response.setId(ticket.getId());
                return response;
            })
            .collect(Collectors.toCollection(ArrayList::new));
        }
}

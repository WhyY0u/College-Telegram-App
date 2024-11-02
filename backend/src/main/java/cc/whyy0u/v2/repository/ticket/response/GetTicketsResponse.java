package cc.whyy0u.v2.repository.ticket.response;

import cc.whyy0u.v2.entity.ticket.TicketStatus;
import cc.whyy0u.v2.entity.ticket.TicketType;
import lombok.Data;

@Data
public class GetTicketsResponse {
    Long id;
    String name;
    TicketStatus status;
    TicketType type;
}

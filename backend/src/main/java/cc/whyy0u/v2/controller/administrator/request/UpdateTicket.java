package cc.whyy0u.v2.controller.administrator.request;

import cc.whyy0u.v2.entity.ticket.TicketStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateTicket {

    TicketStatus status;

    @Size(min = 35, max = 2000)
    String comment;

    @NotNull
    Long ticketId;

}

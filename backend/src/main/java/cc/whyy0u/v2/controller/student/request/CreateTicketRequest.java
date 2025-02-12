package cc.whyy0u.v2.controller.student.request;



import cc.whyy0u.v2.entity.ticket.TicketType;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateTicketRequest {
    
    @NotNull
    @Size(min = 4, max = 30)    
    private String name;

    @NotNull
    @Size(min = 35, max = 2000)
    private String description;

    @NotNull
    private TicketType type;
}

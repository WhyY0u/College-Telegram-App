package cc.whyy0u.v2.repository.ticket.response;

import java.util.ArrayList;

import cc.whyy0u.v2.entity.user.Role;
import lombok.Data;

@Data
public class GetTicketResponseAll {
    ArrayList<GetTicketsResponse> reponse;
    Role use_role;
    private int currentPage; 
    private int totalPages;
    private long totalItems;
}

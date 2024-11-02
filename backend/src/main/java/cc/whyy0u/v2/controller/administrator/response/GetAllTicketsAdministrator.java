package cc.whyy0u.v2.controller.administrator.response;

import java.util.ArrayList;

import cc.whyy0u.v2.repository.ticket.response.GetTicketsResponse;
import lombok.Data;

@Data
public class GetAllTicketsAdministrator {
    int totalPages;
    int currentPage;
    ArrayList<GetTicketsResponse> ticketsResponse;
}

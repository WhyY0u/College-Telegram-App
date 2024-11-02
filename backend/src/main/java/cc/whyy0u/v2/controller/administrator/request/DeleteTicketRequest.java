package cc.whyy0u.v2.controller.administrator.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeleteTicketRequest {

    @NotNull
    private Long id;
}

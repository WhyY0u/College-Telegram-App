package cc.whyy0u.v2.controller.student.request;

import java.util.ArrayList;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonInclude;

import cc.whyy0u.v2.entity.ticket.TicketType;
import cc.whyy0u.v2.entity.ticket.TicketVisionType;
import cc.whyy0u.v2.validator.FileCountLimit;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateTicketRequest {
    
    @NotNull
    @Size(min = 3, max = 30)    
    private String name;

    @NotNull
    @Size(min = 30, max = 2000)
    private String description;

    @NotNull
    private TicketType type;

    @NotNull
    private TicketVisionType visionType;

    private MultipartFile image;
}

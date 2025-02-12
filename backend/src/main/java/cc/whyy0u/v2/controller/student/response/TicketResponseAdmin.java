package cc.whyy0u.v2.controller.student.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY) 
public class TicketResponseAdmin {
    String header;
    String description;
    String group;
    String type;
    String comment;
    String userName;
    String usertype;
    Long id;
}

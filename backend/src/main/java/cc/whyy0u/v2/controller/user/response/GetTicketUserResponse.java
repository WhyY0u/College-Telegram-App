package cc.whyy0u.v2.controller.user.response;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.entity.ticket.TicketStatus;
import cc.whyy0u.v2.entity.ticket.TicketType;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.utils.FileUtils;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class GetTicketUserResponse {
    String name;
    String surname;
    String patronymic;
    String ticketName;
    TicketType type;
    TicketStatus status;
    String description;
    String comment;
    String moderator_name;
    String moderator_surname;
    String moderator_patronymic;
    byte[] images;

    public GetTicketUserResponse(UserEntity student, UserEntity moderator, TicketEntity ticket) throws IOException {
      this.ticketName = ticket.getName();
      this.type = ticket.getType();
      this.status = ticket.getStatus();
      this.description = ticket.getDescription();
      images = FileUtils.getImage(ticket.getImages());
      if(moderator != null) {
        this.comment = ticket.getComment();
        this.moderator_name = moderator.getName();
        this.moderator_patronymic = moderator.getPatronymic();
        this.moderator_surname = moderator.getSurname();
      }
      this.name = student.getName();
      this.surname = student.getSurname();
      this.patronymic = student.getPatronymic();
    }
}

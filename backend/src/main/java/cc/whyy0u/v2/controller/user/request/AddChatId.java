package cc.whyy0u.v2.controller.user.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddChatId {
    @NotNull
    String chatId;
}

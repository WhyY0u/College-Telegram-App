package cc.whyy0u.v2.controller.user.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class GetProfile {
    byte[] image;
    String description;
}

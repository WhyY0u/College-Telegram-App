package cc.whyy0u.v2.controller.news.response;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GetEvent {
    String name;
    String description;
    String place;
    String start;
    String create;
    String type;
    ArrayList<byte[]> images;
}

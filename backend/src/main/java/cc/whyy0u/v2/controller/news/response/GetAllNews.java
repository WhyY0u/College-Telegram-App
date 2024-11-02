package cc.whyy0u.v2.controller.news.response;

import java.util.ArrayList;

import lombok.Data;

@Data
public class GetAllNews {
     ArrayList<Object> toDay;
     ArrayList<Object> past;
}

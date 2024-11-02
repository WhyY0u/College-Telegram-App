package cc.whyy0u.v2.controller.news;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cc.whyy0u.v2.controller.news.response.GetAllNews;
import cc.whyy0u.v2.service.news.NewsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v2/news")
public class NewsController {
    
    @Autowired
    NewsService newsService;

    @GetMapping("/get")
    public ResponseEntity<?> getAllNewsAndEvent() {
        GetAllNews getAllNews = new GetAllNews();
        getAllNews.setPast(newsService.convertNewsToGetNews(newsService.getPastItems()));
        getAllNews.setToDay(newsService.convertNewsToGetNews(newsService.getTodayItems()));
        return ResponseEntity.ok().body(getAllNews);
    }
    
}

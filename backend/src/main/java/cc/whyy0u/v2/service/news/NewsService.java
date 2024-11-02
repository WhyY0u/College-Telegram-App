package cc.whyy0u.v2.service.news;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.events.Event;

import cc.whyy0u.v2.controller.news.response.GetEvent;
import cc.whyy0u.v2.entity.news.EventEntity;
import cc.whyy0u.v2.entity.news.NewsEntity;
import cc.whyy0u.v2.entity.ticket.TicketEntity;
import cc.whyy0u.v2.repository.news.EventRepository;
import cc.whyy0u.v2.repository.news.NewsRepository;
import cc.whyy0u.v2.repository.ticket.response.GetTicketsResponse;
import cc.whyy0u.v2.utils.DateUtils;
import cc.whyy0u.v2.utils.FileUtils;

@Service
public class NewsService {

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    EventRepository eventRepository;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    public void saveNews(NewsEntity news) {
        newsRepository.save(news);
    }
    public void saveEvent(EventEntity event) {
        eventRepository.save(event);
    }
    public ArrayList<NewsEntity> getAllNews() {
        return (ArrayList<NewsEntity>) newsRepository.findAll();
    }

    public ArrayList<EventEntity> getAllEvents() {
        return (ArrayList<EventEntity>) eventRepository.findAll();
    }

    public ArrayList<Object> convertNewsToGetNews(List<Object> objects) {
    return objects.stream()
        .map(obj -> {
           if(obj instanceof EventEntity) {
            EventEntity eventEntity = (EventEntity) obj;
            GetEvent event = new GetEvent();
            event.setName(eventEntity.getName());
            event.setDescription(eventEntity.getDescription());
            event.setPlace(eventEntity.getPlace());
            event.setCreate(eventEntity.getCreate().toLocalDate().format(formatter));
            event.setStart(DateUtils.formatDate(eventEntity.getStart()));
            event.setType("Event");
            final ArrayList<byte[]> images = new ArrayList<>();
            for(String str : eventEntity.getImages()) {
                try {
                    images.add(FileUtils.getImage(str));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            event.setImages(images);
            return event;
           }

           if(obj instanceof NewsEntity) {
            NewsEntity newsEntity = (NewsEntity) obj;
            GetEvent news = new GetEvent();
            news.setName(newsEntity.getName());
            news.setDescription(newsEntity.getDescription());
            news.setType("News");
            news.setCreate(newsEntity.getCreate().toLocalDate().format(formatter));
            final ArrayList<byte[]> images = new ArrayList<>();
            for(String str : newsEntity.getImages()) {
                try {
                    images.add(FileUtils.getImage(str));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            news.setImages(images);
            return news;
           }
           return null;
        })
        .collect(Collectors.toCollection(ArrayList::new));
    }


    public List<EventEntity> getPastEvents() {
    LocalDateTime startOfToday = LocalDateTime.now().with(LocalTime.MIN); 
    return getAllEvents().stream()
            .filter(event -> event.getStart().isBefore(startOfToday)) 
            .sorted((e1, e2) -> e1.getStart().compareTo(e2.getStart()))
            .collect(Collectors.toList());
}

public List<NewsEntity> getPastNews() {
    LocalDateTime startOfToday = LocalDateTime.now().with(LocalTime.MIN);
    return getAllNews().stream()
            .filter(news -> news.getCreate().isBefore(startOfToday)) 
            .sorted((n1, n2) -> n1.getCreate().compareTo(n2.getCreate()))
            .collect(Collectors.toList());
}

    public List<NewsEntity> getTodayNews() {
        LocalDate today = LocalDate.now();
        return getAllNews().stream()
                .filter(news -> news.getCreate().toLocalDate().isEqual(today))
                .sorted(Comparator.comparing(NewsEntity::getCreate).reversed())
                .collect(Collectors.toList());
    }
    public List<EventEntity> getTodayEvents() {
        LocalDate today = LocalDate.now();
        return getAllEvents().stream()
                .filter(event -> event.getStart().toLocalDate().isEqual(today))
                .sorted(Comparator.comparing(EventEntity::getStart).reversed())
                .collect(Collectors.toList());
    }

    public List<Object> getTodayItems() {
        List<EventEntity> todayEvents = getTodayEvents();
        List<NewsEntity> todayNews = getTodayNews();
        List<Object> todayItems = new ArrayList<>();
        todayItems.addAll(todayEvents);
        todayItems.addAll(todayNews);
    
        LocalDateTime now = LocalDateTime.now();
    
        return todayItems.stream()
            .sorted(Comparator.comparing(item -> {
                if (item instanceof EventEntity) {
                    return Math.abs(Duration.between(now, ((EventEntity) item).getStart()).toMillis());
                } else if (item instanceof NewsEntity) {
                    return Math.abs(Duration.between(now, ((NewsEntity) item).getCreate()).toMillis());
                }
                return Long.MAX_VALUE; 
            }))
            .collect(Collectors.toList());
    }
    

    public List<Object> getPastItems() {
        List<EventEntity> pastEvents = getPastEvents();
        List<NewsEntity> pastNews = getPastNews();
        List<Object> pastItems = new ArrayList<>();
        pastItems.addAll(pastEvents);
        pastItems.addAll(pastNews);
        LocalDateTime now = LocalDateTime.now();
         return pastItems.stream()
            .sorted(Comparator.comparing(item -> {
                if (item instanceof EventEntity) {
                    return Math.abs(Duration.between(now, ((EventEntity) item).getStart()).toMillis());
                } else if (item instanceof NewsEntity) {
                    return Math.abs(Duration.between(now, ((NewsEntity) item).getCreate()).toMillis());
                }
                return Long.MAX_VALUE; 
            }))
            .collect(Collectors.toList());
    }
    
}

package cc.whyy0u.v2.scheduled.ticket;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import cc.whyy0u.v2.entity.news.EventEntity;
import cc.whyy0u.v2.entity.user.UserEntity;
import cc.whyy0u.v2.service.bot.TelegramService;
import cc.whyy0u.v2.service.news.NewsService;
import cc.whyy0u.v2.service.user.UserService;

@Component
public class TicketScheduled {

    @Autowired
    NewsService newsService;

    @Autowired
    UserService userService;

    @Autowired
    TelegramService telegramService;

    @Scheduled(fixedRate = 60000)
    public void sendEvent() {
        LocalDateTime now = LocalDateTime.now();
        List<EventEntity> events = newsService.getTodayEvents(); 
        for (EventEntity eventEntity : events) {
            if(eventEntity.isSendet()) continue;
            LocalDateTime eventStart = eventEntity.getStart(); 
            long minutesUntilStart = ChronoUnit.MINUTES.between(now, eventStart);
            if (minutesUntilStart >= 0 && minutesUntilStart <= 5) {
                eventEntity.setSendet(true);
                newsService.saveEvent(eventEntity);
                   for(UserEntity userEntity : userService.findAllUsers()) {
                    if(userEntity.getChatId() != null) {
                        telegramService.sendChat(userEntity.getChatId(), "✨ Мероприятие: " + eventEntity.getName() +
                   "\n⏳ Начнется через: " + minutesUntilStart + " минут(ы)" +
                   "\n📍 Место: '" + eventEntity.getPlace() + "'");
                    }
                   }
            }
        }
    }
}

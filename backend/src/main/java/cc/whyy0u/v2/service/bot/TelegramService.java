package cc.whyy0u.v2.service.bot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import cc.whyy0u.v2.telegram.TelegramBot;

@Service
public class TelegramService {
    
    @Autowired
    private TelegramBot myTelegramBot; 

    public void sendChat(String chatId, String messageText) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        message.setText(messageText);
        message.setParseMode("Markdown");
        
        try {
            myTelegramBot.execute(message); 
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}

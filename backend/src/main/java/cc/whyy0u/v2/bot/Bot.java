package cc.whyy0u.v2.bot;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Component
public class Bot extends TelegramLongPollingBot {

    private final String botUsername;
    private final String botToken;

    public Bot(String botUsername, String botToken) {
        this.botUsername = botUsername;
        this.botToken = botToken;
    }

    @Override
public void onUpdateReceived(Update update) {
    Message message = update.getMessage();

    if (message != null && message.hasText() && message.getText().equals("/start")) {
        SendMessage sendMessage = new SendMessage();
        sendMessage.setChatId(message.getChatId().toString());
        sendMessage.setText("Привет! Нажмите кнопку ниже, чтобы открыть KitAitu.");

        InlineKeyboardButton button = new InlineKeyboardButton();
        button.setText("Открыть KitAitu");
        button.setUrl("https://telegram-app.pbk.kz/");

        InlineKeyboardMarkup keyboardMarkup = new InlineKeyboardMarkup();
        
        List<List<InlineKeyboardButton>> keyboard = new ArrayList<>();
        
        List<InlineKeyboardButton> row = new ArrayList<>();
        row.add(button);
        keyboard.add(row);
        
        keyboardMarkup.setKeyboard(keyboard);

        sendMessage.setReplyMarkup(keyboardMarkup);

        try {
            execute(sendMessage); 
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}


    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }
}
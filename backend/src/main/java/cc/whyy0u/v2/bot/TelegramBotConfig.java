package cc.whyy0u.v2.bot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.generics.BotSession;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;


@Configuration
public class TelegramBotConfig {

    @Value("${BOT_USERNAME}")
    private String botUsername;

    @Value("${BOT_TOKEN}")
    private String botToken;

    @Bean
    public BotSession botSession(TelegramLongPollingBot telegramBot) throws TelegramApiException {
        TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
        BotSession session = telegramBotsApi.registerBot(telegramBot);
        return session;
    }

    @Bean
    public TelegramLongPollingBot telegramBot() {
        return new Bot(botUsername, botToken);
    }

    @Bean
    public String botUsername() {
        return botUsername;
    }

    @Bean
    public String botToken() {
        return botToken;
    }
}


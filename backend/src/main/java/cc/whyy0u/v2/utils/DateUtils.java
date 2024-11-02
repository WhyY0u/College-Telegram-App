package cc.whyy0u.v2.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    public static String formatDate(LocalDateTime dateTime) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        DateTimeFormatter dayMonthFormatter = DateTimeFormatter.ofPattern("E, d MMMM");
        DateTimeFormatter fullDateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        if (dateTime.toLocalDate().isEqual(now.toLocalDate())) {
            return "Сегодня в " + dateTime.format(timeFormatter);
        } else if (dateTime.getYear() == now.getYear()) {
            return dateTime.format(dayMonthFormatter) + " в " + dateTime.format(timeFormatter);
        } else {
            return dateTime.format(fullDateFormatter);
        }
    }
}

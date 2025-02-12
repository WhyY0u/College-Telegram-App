package cc.whyy0u.v2.utils;

import cc.whyy0u.v2.entity.ticket.TicketStatus;

public class TicketUtils {
    public static String getStatus(TicketStatus status) {
        switch (status) {
            case Denied: return "Отклонено";
            case InProgress: return "Выполняется";
            case Expectation: return "Ожидание";
            case Ready: return "Выполнено";
    }
    return "Выполняется";

   }
   public static TicketStatus getStatusFromString(String status) {
         switch (status) {
            case "Выполняется": return TicketStatus.InProgress;
            case "Выполнено": return TicketStatus.Ready;
            case "Отказано": return TicketStatus.Denied;
         }
         return TicketStatus.Expectation;
   }
}

package com.example.database.utils;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class DateTime {

    public static String dateTimeNow() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return dtf.format(now);
    }

}

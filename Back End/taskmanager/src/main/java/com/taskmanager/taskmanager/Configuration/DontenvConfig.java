package com.taskmanager.taskmanager.Configuration;

import io.github.cdimascio.dotenv.Dotenv;

public class DontenvConfig {
    private static final Dotenv dotenv = Dotenv.load();

    public static String get(String key) {
        return dotenv.get(key);
    }
}

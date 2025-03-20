package com.taskmanager.taskmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.taskmanager.taskmanager.Configuration.DontenvConfig;


@SpringBootApplication
public class TaskmanagerApplication {

	public static void main(String[] args) {

		//carregando variáveis de conexão para o DB do .env
		//ignore a instrução System
		System.setProperty("DATABASE_USER", DontenvConfig.get("DATABASE_USER"));
        System.setProperty("DATABASE_PASSWORD", DontenvConfig.get("DATABASE_PASSWORD"));
		SpringApplication.run(TaskmanagerApplication.class, args);
	}

}

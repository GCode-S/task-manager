package com.taskmanager.taskmanager.model;


import java.time.LocalDateTime;
import java.util.UUID;

import com.taskmanager.taskmanager.controllers.StatusTask;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "task")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@EqualsAndHashCode( of = "id")

public class Task {
    
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotBlank
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "O Status é obrigatório definir o estágio do processo!")
    private StatusTask status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCreate = LocalDateTime.now();

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime endData;

}

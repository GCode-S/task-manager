package com.taskmanager.taskmanager.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.taskmanager.taskmanager.controllers.StatusTask;
import com.taskmanager.taskmanager.model.Task;

@Repository
public interface TaskRepository  extends JpaRepository <Task, UUID>{
    Page<Task> findByStatus(StatusTask status, Pageable pageable);
}

package com.taskmanager.taskmanager.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Sort;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.repository.TaskRepository;
import com.taskmanager.taskmanager.controllers.StatusTask;
import com.taskmanager.taskmanager.model.Task;

@Service
public class TaskServices {
 
    @Autowired
    private TaskRepository repositoryTask;
    
    public Page<Task> getAllTask(int page, int size, String status, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by("dataCreate").ascending() : Sort.by("dataCreate").descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);


         StatusTask statusEnum = null;
    if (status != null && !status.isEmpty()) {
        try {
            statusEnum = StatusTask.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Status inválido: " + status);
        }
    }

    return (statusEnum != null) ? 
        repositoryTask.findByStatus(statusEnum, pageRequest) : repositoryTask.findAll(pageRequest);

        // return repositoryTask.findAll(PageRequest.of(page, size, sort));
    }

    public Task findTaskID(UUID id){

        Optional<Task> taskData = repositoryTask.findById(id);
        if(taskData.isPresent()){
            return taskData.get();
        }else{
            return null;
        }

        // return repositoryTask.findById(id);
    }

    public Task salveData(Task task){
        return repositoryTask.save(task);
    }

    public Task putData(Task task){

        Optional<Task> taskData = repositoryTask.findById(task.getId());

        if(taskData.isPresent()){
            Task newTask = taskData.get();

            newTask.setTitle(task.getTitle());
            newTask.setDescription(task.getDescription());
            newTask.setEndData(task.getEndData());
            newTask.setStatus(task.getStatus());

            return repositoryTask.save(newTask);      
        }
                return null;
    }

    public Boolean deleteData(UUID id){
        if(!repositoryTask.existsById(id)){
            return false;
        }else{
             repositoryTask.deleteById(id);
             return true;
        }
    }

}

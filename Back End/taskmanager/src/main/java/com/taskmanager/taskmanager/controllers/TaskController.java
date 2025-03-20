package com.taskmanager.taskmanager.controllers;

import java.util.UUID;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.taskmanager.taskmanager.model.Task;
import com.taskmanager.taskmanager.services.TaskServices;

import jakarta.validation.Valid;

// import org.springframework.web.bind.annotation.CrossOrigin;
// liberando o cors para aplicação front
// @CrossOrigin(origins = "http://localhost:3000")

@Tag(name = "Task Controller", description = "Gerencia as tarefas do sistema")
@RestController
@RequestMapping("/api/task")
public class TaskController {
    
    @Autowired
    private TaskServices taskService;

    @GetMapping
    @Operation(summary = "Listar todas as tarefas", description = "Retorna uma lista de todas as tarefas")
     public ResponseEntity<Page<Task>> getTask(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(required = false) String status,
        @RequestParam(defaultValue = "desc") String direction
    ) {
        Page<Task> tasks = taskService.getAllTask(page, size, status, sortBy, direction);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Listar uma tarefa pelo seu identificador", description = "Retorna uma objeto com ainformações da tarefa selecionada")
    public ResponseEntity<?> getTaskId(@PathVariable UUID id) {
        return ResponseEntity.ok(taskService.findTaskID(id));
    }

    @PostMapping
    @Operation(summary = "Criar uma nova tarefa", description = "Cria e retorna a nova tarefa")
    public ResponseEntity<?> createTask(@RequestBody @Valid Task task){
        return ResponseEntity.ok(taskService.salveData(task));
    }

    @PutMapping
    @Operation(summary = "Atualizar uma tarefa", description = "Modifica os dados de uma tarefa existente")
    public ResponseEntity<?> putTask(@RequestBody @Valid Task task ){
        if(taskService.putData(task) != null){
           return ResponseEntity.ok("Dados Alterados com Sucesso!");
        }else{
           return ResponseEntity.notFound().build();
        }        
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar uma tarefa", description = "Remove uma tarefa pelo ID")
    public ResponseEntity<?> deleteTask(@PathVariable  UUID id){

        if(taskService.deleteData(id) == false){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok("A tarefa foi deletada com Sucesso!");
        }
    }

}

package com.techpods.to_do_list.controller;

import java.util.List;

import com.techpods.to_do_list.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.techpods.to_do_list.entity.Task;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/findAll")
    List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/findById/{id}")
    Task getTaskById(@PathVariable("id") Long id){
        return taskService.getTaskById(id);
    }

    @PostMapping("/create")
    Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @PutMapping("/update/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @PutMapping("/markCompleted/{id}")
    public Task markTaskCompleted(@PathVariable Long id){
        return taskService.markTaskCompleted(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

}

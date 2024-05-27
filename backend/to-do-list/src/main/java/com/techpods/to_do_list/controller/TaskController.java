package com.techpods.to_do_list.controller;

import java.util.List;

import com.techpods.to_do_list.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.techpods.to_do_list.entity.Task;

@Controller
@RequestMapping("/task")
public class TaskController {

    /*
    How It Works:
    1. Add a Task:

        Tap the 'Add Task' button,
        type your task description and
        add priority

        ( there should be 3 available priorities each one should have it’s one color to be easily distinguishable)


    2. Edit a Task: Click on a task to edit its details or change the priority
    3. Delete a Task
    4. Mark Task as completed
    */

    @Autowired
    private TaskService taskService;

    @GetMapping("/findAll")
    List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    Task getTaskById(@PathVariable("id") Long id){
        return taskService.getTaskById(id);
    }

    @PostMapping("/create")
    Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public Task markTaskCompleted(@PathVariable Long id){
        return taskService.markTaskCompleted(id);
    }

}

package com.techpods.to_do_list.service.impl;

import com.techpods.to_do_list.entity.Task;
import com.techpods.to_do_list.repository.TaskRepository;
import com.techpods.to_do_list.service.intrf.TaskServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService implements TaskServiceI {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public Task updateTask(Long id, Task task) {
        task.setId(id);
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task markTaskCompleted(Long id) {
        Task task = getTaskById(id);
        task.setCompleted(true);
        return updateTask(id, task);
    }
}
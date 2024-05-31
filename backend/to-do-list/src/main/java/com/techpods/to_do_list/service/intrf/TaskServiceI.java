package com.techpods.to_do_list.service.intrf;

import com.techpods.to_do_list.entity.Task;

import java.util.List;

public interface TaskServiceI {
    Task createTask(Task task);

    List<Task> getAllTasks();

    Task getTaskById(Long id);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);

    Task markTaskCompleted(Long id);
}

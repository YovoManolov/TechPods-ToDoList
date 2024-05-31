package com.techpods.to_do_list.service.impl;

import com.techpods.to_do_list.entity.Priority;
import com.techpods.to_do_list.entity.Task;
import com.techpods.to_do_list.repository.TaskRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    private Task task;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        task = new Task();
        task.setId(1L);
        task.setName("Test Task");
        task.setCompleted(false);
        task.setPriority(Priority.LOW);
    }

    @Test
    public void testCreateTask() {
        when(taskRepository.save(task)).thenReturn(task);

        Task createdTask = taskService.createTask(task);

        Assertions.assertEquals(task, createdTask);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testFindAllTasks() {
        List<Task> tasks = Collections.singletonList(task);

        when(taskRepository.findAll()).thenReturn(tasks);


        List<Task> result = taskService.getAllTasks();

        Assertions.assertEquals(tasks, result);
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    public void testFindTaskById() {

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1L);

        Assertions.assertEquals(task, result);
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    public void testUpdateTask() {
        when(taskRepository.save(task)).thenReturn(task);

        Task updatedTask = taskService.updateTask(1L, task);

        Assertions.assertEquals(task, updatedTask);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testDeleteTask() {
        doNothing().when(taskRepository).deleteById(1L);

        taskService.deleteTask(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testMarkTaskCompleted() {
        task.setCompleted(false); //intial state before the marking process.

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);

        Task completedTask = taskService.markTaskCompleted(1L);

        Assertions.assertTrue(completedTask.isCompleted());
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(task);
    }
}
package com.nodeZS.task_manager.service;

import com.nodeZS.task_manager.exception.ResourceNotFoundException;
import com.nodeZS.task_manager.model.Status;
import com.nodeZS.task_manager.model.Task;
import com.nodeZS.task_manager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setStatus(Status.TODO);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    @Override
    public Task updateTask(Long id, Task task) {

        Task existing = getTaskById(id);

        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setPriority(task.getPriority());
        existing.setDueDate(task.getDueDate());
        existing.setAssigneeEmail(task.getAssigneeEmail());
        existing.setStatus(task.getStatus());

        return taskRepository.save(existing);
    }

    @Override
    public void deleteTask(Long id) {

        Task task = getTaskById(id);
        taskRepository.delete(task);
    }

    @Override
    public Task markTaskComplete(Long id) {

        Task task = getTaskById(id);

        task.setStatus(Status.DONE);
        task.setCompletedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }
}

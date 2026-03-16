package com.nodeZS.task_manager.repository;

import com.nodeZS.task_manager.model.Task;
import com.nodeZS.task_manager.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(Status status);

    List<Task> findByAssigneeEmail(String assigneeEmail);

}
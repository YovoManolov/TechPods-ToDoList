package com.techpods.to_do_list.repository;

import com.techpods.to_do_list.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

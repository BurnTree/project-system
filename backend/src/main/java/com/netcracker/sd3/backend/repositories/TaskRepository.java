package com.netcracker.sd3.backend.repositories;

import com.netcracker.sd3.backend.entity.TaskEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<TaskEntity,Long> {
}
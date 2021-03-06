package com.netcracker.projectsystem.demo.service.impl;

import com.netcracker.projectsystem.demo.models.TaskModel;
import com.netcracker.projectsystem.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {


    @Value("${backend.server.url}")
    private String backendServerUrl;

    private RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<TaskModel> getAll() {
        RestTemplate restTemplate = new RestTemplate();
        TaskModel[] taskModels = restTemplate.getForObject(backendServerUrl + "/api/task/all",TaskModel[].class);
        return taskModels == null ? Collections.emptyList() : Arrays.asList(taskModels);
    }

    @Override
    public TaskModel findById(long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/task/" + id, TaskModel.class);
    }

    @Override
    public TaskModel save(TaskModel task) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl+"/api/task", task, TaskModel.class).getBody();
    }

    @Override
    public TaskModel update(TaskModel task) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put(backendServerUrl+"/api/task/"+task.getIdTask(),task);
        return task;
    }

    @Override
    public Page<TaskModel> getAllInPage(int page, int size, String sort, Sort.Direction direction) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl
                +"/api/task/page?page=" + page
                + "&size="+size
                + "&sort=" + sort
                + "&direction=" + direction, RestPageImpl.class);
    }

    @Override
    public List<TaskModel> getAllByAsiignee(long idUser) {
        RestTemplate restTemplate = new RestTemplate();
        TaskModel[] taskModels = restTemplate.getForObject(backendServerUrl + "/api/task/assigne?user="+idUser,TaskModel[].class);
        return taskModels == null ? Collections.emptyList() : Arrays.asList(taskModels);
    }

    @Override
    public List<TaskModel> getAllByReporter(long idUser) {
        RestTemplate restTemplate = new RestTemplate();
        TaskModel[] taskModels = restTemplate.getForObject(backendServerUrl + "/api/task/reporter?user="+idUser,TaskModel[].class);
        return taskModels == null ? Collections.emptyList() : Arrays.asList(taskModels);
    }

    @Override
    public List<TaskModel> getAllTesting() {
        RestTemplate restTemplate = new RestTemplate();
        TaskModel[] taskModels = restTemplate.getForObject(backendServerUrl + "/api/task/openForTest",TaskModel[].class);
        return taskModels == null ? Collections.emptyList() : Arrays.asList(taskModels);
    }


}

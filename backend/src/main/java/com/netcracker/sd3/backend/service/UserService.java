package com.netcracker.sd3.backend.service;

import com.netcracker.sd3.backend.entity.Role;
import com.netcracker.sd3.backend.entity.UsersEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UsersEntity addUser(UsersEntity user);
    UsersEntity findById(Long id);
    Iterable<UsersEntity> getAll();
    void deleteUser(Long id);
    UsersEntity findByLogin(String login);
    Iterable<UsersEntity> getAllByRole(long role);
}
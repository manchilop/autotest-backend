package com.example.autotest_backend.service;

import com.example.autotest_backend.model.User;

import java.util.Optional;

public interface UserService {

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    boolean existsByEmail(String email);

    User createUserIfNotExists(String email);
}

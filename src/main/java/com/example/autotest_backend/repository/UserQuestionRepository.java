package com.example.autotest_backend.repository;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.User;
import com.example.autotest_backend.model.UserQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserQuestionRepository extends JpaRepository<UserQuestion, Long> {

    boolean existsByUserAndQuestion(User user, Question question);

    List<UserQuestion> findByUser(User user);
}

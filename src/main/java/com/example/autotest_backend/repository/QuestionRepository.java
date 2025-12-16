package com.example.autotest_backend.repository;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.QuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByStatus(QuestionStatus status);
}

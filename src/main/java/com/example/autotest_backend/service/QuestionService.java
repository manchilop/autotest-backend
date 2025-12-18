package com.example.autotest_backend.service;

import com.example.autotest_backend.model.Question;

import java.util.List;

public interface QuestionService {

    Question createQuestion(Question question);

    List<Question> getApprovedQuestions();

    Question approveQuestion(Long questionId);

    Question rejectQuestion(Long questionId);
}

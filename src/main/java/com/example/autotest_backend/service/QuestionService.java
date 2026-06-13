package com.example.autotest_backend.service;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.QuestionStatus;
import com.example.autotest_backend.model.User;

import java.util.List;

public interface QuestionService {

    Question createQuestion(Question question);

    List<Question> getAllQuestions();

    List<Question> getQuestionsByStatus(QuestionStatus status);

    Question approveQuestion(Long questionId);

    Question rejectQuestion(Long questionId);

    Question getNextQuestion(Long userId);

    boolean answerQuestion(Long questionId, Long choiceId, User user);
}

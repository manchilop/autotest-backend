package com.example.autotest_backend.service;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.User;
import com.example.autotest_backend.model.UserQuestion;

import java.util.List;
public interface UserQuestionService {

    UserQuestion markAsCompleted(User user, Question question);

    boolean hasUserCompletedQuestion(User user, Question question);

    List<UserQuestion> getCompletedQuestionsByUser(User user);
}

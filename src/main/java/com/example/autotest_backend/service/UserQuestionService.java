package com.example.autotest_backend.service;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.User;
import com.example.autotest_backend.model.UserQuestion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface UserQuestionService {

    UserQuestion markAsCompleted(User user, Question question);

    boolean hasUserCompletedQuestion(User user, Question question);

    List<UserQuestion> getCompletedQuestionsByUser(User user);
}

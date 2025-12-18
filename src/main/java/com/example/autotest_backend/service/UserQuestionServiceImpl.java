package com.example.autotest_backend.service;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.User;
import com.example.autotest_backend.model.UserQuestion;
import com.example.autotest_backend.repository.UserQuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class UserQuestionServiceImpl implements UserQuestionService {

    private final UserQuestionRepository userQuestionRepository;

    @Override
    public UserQuestion markAsCompleted(User user, Question question) {

        if (userQuestionRepository.existsByUserAndQuestion(user, question)) {
            throw new IllegalStateException("Question already completed by user");
        }

        UserQuestion userQuestion = UserQuestion.builder()
                .user(user)
                .question(question)
                .build();

        return userQuestionRepository.save(userQuestion);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean hasUserCompletedQuestion(User user, Question question) {
        return userQuestionRepository.existsByUserAndQuestion(user, question);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserQuestion> getCompletedQuestionsByUser(User user) {
        return userQuestionRepository.findByUser(user);
    }
}

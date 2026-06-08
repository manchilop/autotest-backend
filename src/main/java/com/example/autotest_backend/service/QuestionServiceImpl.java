package com.example.autotest_backend.service;

import com.example.autotest_backend.model.Choice;
import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.QuestionStatus;
import com.example.autotest_backend.model.User;
import com.example.autotest_backend.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final UserQuestionServiceImpl userQuestionServiceImpl;


    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Question> getQuestionsByStatus(QuestionStatus status) {
        return questionRepository.findByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public Question getNextQuestion(Long userId) {
        Optional<Question> approved = questionRepository.findRandomUnansweredApprovedByUser(userId);
        if (approved.isPresent()) return approved.get();

        Optional<Question> pending = questionRepository.findRandomUnansweredPendingByUser(userId);
        if (pending.isPresent()) return pending.get();

        return questionRepository.findRandomApproved().orElseThrow(() -> new IllegalStateException("No questions available"));
    }

    @Override
    public boolean answerQuestion(Long questionId, Long choiceId, User user) {
        Question question = getQuestionOrThrow(questionId);
        
        boolean correct = question.getChoices().stream()
                .filter(c -> c.getId().equals(choiceId))
                .findFirst()
                .map(Choice::isCorrect)
                .orElseThrow(() -> new IllegalArgumentException("Choice not found"));

        try {
            userQuestionServiceImpl.markAsCompleted(user, question);
        } catch (IllegalStateException e) {
            // ya respondida antes, ignoramos
        }

        return correct;
    }

    @Override
    public Question approveQuestion(Long questionId) {
        Question question = getQuestionOrThrow(questionId);
        question.setStatus(QuestionStatus.APPROVED);
        return question;
    }

    @Override
    public Question rejectQuestion(Long questionId) {
        Question question = getQuestionOrThrow(questionId);
        question.setStatus(QuestionStatus.REJECTED);
        return question;
    }

    private Question getQuestionOrThrow(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));
    }
}

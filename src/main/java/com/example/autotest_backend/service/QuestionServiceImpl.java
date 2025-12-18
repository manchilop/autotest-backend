package com.example.autotest_backend.service;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.QuestionStatus;
import com.example.autotest_backend.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;


    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Question> getApprovedQuestions() {
        return questionRepository.findByStatus(QuestionStatus.APPROVED);
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

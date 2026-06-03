package com.example.autotest_backend.controller;

import com.example.autotest_backend.dto.question.CreateQuestionRequest;
import com.example.autotest_backend.dto.question.QuestionResponse;
import com.example.autotest_backend.mapper.QuestionMapper;
import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.QuestionStatus;
import com.example.autotest_backend.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    //STUDENT
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionResponse createQuestion(
            @RequestBody @Valid CreateQuestionRequest request
    ) {
        Question question = questionMapper.toEntity(request);

        request.getChoices().forEach(choiceRequest -> {
            question.addChoice(questionMapper.toEntity(choiceRequest));
        });

        Question saved = questionService.createQuestion(question);

        return questionMapper.toResponse(saved);
    }

    @GetMapping
    public List<QuestionResponse> getQuestions(@RequestParam(required = false) QuestionStatus status) {
        List<Question> questions;

        if (status != null) {
            questions = questionService.getQuestionsByStatus(status);
        } else {
            questions = questionService.getAllQuestions();
        }

        return questions.stream()
                .map(questionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @PatchMapping("/{id}/approve")
    public QuestionResponse approveQuestion(@PathVariable Long id) {
        Question question = questionService.approveQuestion(id);
        return questionMapper.toResponse(question);
    }

    @PatchMapping("/{id}/reject")
    public QuestionResponse rejectQuestion(@PathVariable Long id) {
        Question question = questionService.rejectQuestion(id);
        return questionMapper.toResponse(question);
    }
}

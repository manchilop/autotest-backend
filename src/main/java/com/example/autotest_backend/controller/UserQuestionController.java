package com.example.autotest_backend.controller;

import com.example.autotest_backend.dto.question.QuestionResponse;
import com.example.autotest_backend.mapper.QuestionMapper;
import com.example.autotest_backend.model.User;
import com.example.autotest_backend.service.UserQuestionService;
import com.example.autotest_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user-questions")
@RequiredArgsConstructor
public class UserQuestionController {

    private final UserService userService;
    private final UserQuestionService userQuestionService;
    private final QuestionMapper questionMapper;

    @GetMapping("/completed")
    public List<QuestionResponse> getCompletedQuestions(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName()).orElseThrow();
        return userQuestionService.getCompletedQuestionsByUser(user)
                                  .stream()
                                  .map(uq -> questionMapper.toResponse(uq.getQuestion()))
                                  .collect(Collectors.toList());
    }
}

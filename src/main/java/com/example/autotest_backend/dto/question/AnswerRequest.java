package com.example.autotest_backend.dto.question;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class AnswerRequest {
    @NotNull
    private Long choiceId;
}

package com.example.autotest_backend.dto.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class CreateQuestionRequest {

    @NotBlank
    @Size(max = 500, message = "Question text must not exceed 500 characters")
    String questionText;

    List<CreateChoiceRequest> choices;
}

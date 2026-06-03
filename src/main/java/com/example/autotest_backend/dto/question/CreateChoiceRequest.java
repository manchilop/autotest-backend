package com.example.autotest_backend.dto.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class CreateChoiceRequest {

    @NotBlank
    @Size(max = 200, message = "Choice text must not exceed 200 characters")
    String choiceText;

    boolean correct;
}

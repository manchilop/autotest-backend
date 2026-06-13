package com.example.autotest_backend.dto.question;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PracticeChoiceResponse {
    Long id;
    String choiceText;
}

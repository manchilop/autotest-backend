package com.example.autotest_backend.dto.question;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class LibraryQuestionResponse {
    Long id;
    String questionText;
    List<LibraryChoiceResponse> choices;
}

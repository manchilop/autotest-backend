package com.example.autotest_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_questions", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "question_id"})
})
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserQuestion {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Setter(lombok.AccessLevel.NONE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @Setter(AccessLevel.PROTECTED)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    @Setter(AccessLevel.PROTECTED)
    private Question question;
}
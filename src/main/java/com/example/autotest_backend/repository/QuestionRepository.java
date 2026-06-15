package com.example.autotest_backend.repository;

import com.example.autotest_backend.model.Question;
import com.example.autotest_backend.model.QuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByStatus(QuestionStatus status);

    @Query("""
    SELECT q FROM Question q
    WHERE q.status = 'APPROVED'
    AND q.id NOT IN (
        SELECT uq.question.id FROM UserQuestion uq WHERE uq.user.id = :userId
    )
    ORDER BY RANDOM()
    LIMIT 1
    """)
    Optional<Question> findRandomUnansweredApprovedByUser(@Param("userId") Long userId);

    @Query("""
    SELECT q FROM Question q
    WHERE q.status = 'PENDING'
    AND q.id NOT IN (
        SELECT uq.question.id FROM UserQuestion uq WHERE uq.user.id = :userId
    )
    ORDER BY RANDOM()
    LIMIT 1
    """)
    Optional<Question> findRandomUnansweredPendingByUser(@Param("userId") Long userId);

    @Query("""
    SELECT q FROM Question q
    WHERE q.status = 'APPROVED'
    ORDER BY RANDOM()
    LIMIT 1
    """)
    Optional<Question> findRandomApproved();
}

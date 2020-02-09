package com.itransition.croudfunding.repository;

import com.itransition.croudfunding.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCompanyID(long id);
}

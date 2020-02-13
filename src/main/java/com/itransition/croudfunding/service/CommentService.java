package com.itransition.croudfunding.service;

import com.itransition.croudfunding.entity.Comment;
import com.itransition.croudfunding.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public Optional<Comment> findById(long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> findByCompanyID(long id) {
        return commentRepository.findByCompanyID(id);
    }

    public void save(Comment comment) {
        commentRepository.save(comment);
    }
}

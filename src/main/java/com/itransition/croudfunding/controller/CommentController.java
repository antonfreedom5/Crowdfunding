package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.Comment;
import com.itransition.croudfunding.entity.CommentType;
import com.itransition.croudfunding.service.CommentService;
import com.itransition.croudfunding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class CommentController {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    @MessageMapping("/comments.sendComment")
    public void sendMessage(@Payload Comment comment) {
        commentService.save(comment);
        messagingTemplate.convertAndSend("/topic/" + comment.getCompanyID(), comment);
    }

    @MessageMapping("/comments.editComment")
    public void sendEditedMessage(@Payload Comment comment) {
        Comment edited = commentService.findById(comment.getId()).get();
        long personWhoRated = userService.findIdByUsername(comment.getSender());
        if (comment.getType().equals(CommentType.LIKE)) {
            edited.getPeopleWhoLikedIDs().add(personWhoRated);
        } else {
            edited.getPeopleWhoDislikedIDs().add(personWhoRated);
        }
        commentService.save(edited);

        edited.setType(CommentType.EDITED);
        messagingTemplate.convertAndSend("/topic/edited/" + edited.getCompanyID(), edited);
    }

    @MessageMapping("/comments.addUser")
    public void addUser(@Payload Comment comment,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", comment.getSender());
        for (Comment msg : commentService.findByCompanyID(comment.getCompanyID())) {
            messagingTemplate.convertAndSendToUser(comment.getSender(), "/reply", msg);
        }
    }
}

package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.Comment;
import com.itransition.croudfunding.entity.CommentType;
import com.itransition.croudfunding.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class CommentController {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    CommentService commentService;

    @MessageMapping("/comments.sendComment")
    public void sendMessage(@Payload Comment comment) {
        commentService.save(comment);
        messagingTemplate.convertAndSend("/topic/" + comment.getCompanyID(), comment);
    }

    @MessageMapping("/comments.addUser")
    @SendTo("/topic/public")
    public Comment addUser(@Payload Comment comment,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", comment.getSender());
        for (Comment msg : commentService.findByCompanyID(comment.getCompanyID())) {
            messagingTemplate.convertAndSendToUser(comment.getSender(), "/reply", msg);
        }
        return comment;
    }
}

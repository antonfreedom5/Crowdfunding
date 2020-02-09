package com.itransition.croudfunding.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long companyID;

    private String sender;

    private String content;

    private CommentType type;

    private String avatarURL;

    @ElementCollection(targetClass = Integer.class)
    @CollectionTable(name = "users_who_liked_comment", joinColumns = @JoinColumn(name = "comment"))
    private Set<Integer> peopleWhoLikedIDs = new HashSet<>();

    @ElementCollection(targetClass = Integer.class)
    @CollectionTable(name = "users_who_disliked_comment", joinColumns = @JoinColumn(name = "comment"))
    private Set<Integer> peopleWhoDislikedIDs = new HashSet<>();
}

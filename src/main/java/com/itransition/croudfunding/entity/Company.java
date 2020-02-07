package com.itransition.croudfunding.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String companyName;

    private int goal;

    private double reached;

    @Column(length = 100)
    private String shortDisc;

    @Column(length = 1000000)
    private String fullDisc;

    @ElementCollection(targetClass = String.class)
    @CollectionTable(name = "company_image", joinColumns = @JoinColumn(name = "company"))
    private List<String> picURLs;

    private String videoLink;

    private Date durationDate;

    @CreationTimestamp
    private Date creationDate;

    private int rating;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user")
    private User author;

    @ElementCollection(targetClass = Categories.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "company_category", joinColumns = @JoinColumn(name = "company"))
    @Enumerated(EnumType.STRING)
    private Set<Categories> categories = new HashSet<>();

    public Company(String companyName, int goal, String shortDisc, String fullDisc, String videoLink, Date durationDate, User author) {
        this.companyName = companyName;
        this.goal = goal;
        this.shortDisc = shortDisc;
        this.fullDisc = fullDisc;
        this.videoLink = videoLink;
        this.durationDate = durationDate;
        this.author = author;
    }
}


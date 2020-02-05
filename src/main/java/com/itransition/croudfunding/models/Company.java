package com.itransition.croudfunding.models;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;
import java.util.Set;

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
    private Set<Categories> categories;

    @Transient
    private List<String> urls;

    public Company(String companyName, int goal, String shortDisc, String fullDisc, String videoLink, Date durationDate, User author) {
        this.companyName = companyName;
        this.goal = goal;
        this.shortDisc = shortDisc;
        this.fullDisc = fullDisc;
        this.videoLink = videoLink;
        this.durationDate = durationDate;
        this.author = author;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getDurationDate() {
        return durationDate;
    }

    public void setDurationDate(Date durationDate) {
        this.durationDate = durationDate;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getShortDisc() {
        return shortDisc;
    }

    public void setShortDisc(String shortDisc) {
        this.shortDisc = shortDisc;
    }

    public String getFullDisc() {
        return fullDisc;
    }

    public void setFullDisc(String fullDisc) {
        this.fullDisc = fullDisc;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public int getGoal() {
        return goal;
    }

    public void setGoal(int goal) {
        this.goal = goal;
    }

    public double getReached() {
        return reached;
    }

    public void setReached(double reached) {
        this.reached = reached;
    }

    public Set<Categories> getCategories() {
        return categories;
    }

    public void setCategories(Set<Categories> categories) {
        this.categories = categories;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }
}


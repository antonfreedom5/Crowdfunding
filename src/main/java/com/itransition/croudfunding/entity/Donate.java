package com.itransition.croudfunding.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class Donate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int sum;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private Company company;

    public Donate(int sum, User user, Company company) {
        this.sum = sum;
        this.user = user;
        this.company = company;
    }
}

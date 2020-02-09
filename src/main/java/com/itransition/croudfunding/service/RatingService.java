package com.itransition.croudfunding.service;

import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.Rating;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserService userService;

    public void save(Company company, int value){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ratingRepository.save(new Rating(company, userService.findUserByUsername(auth.getName()), value));
    }

    public List<Rating> findByCompany(Company company){
        return ratingRepository.findByCompany(company);
    }

    public Rating findByCompanyAndUser(Company company, User user){
        try {
            return ratingRepository.findByCompanyAndUser(company ,user);
        }
        catch (NullPointerException e){
            return null;
        }
    }

    public boolean existsRatingByCompanyAndUser(Company company){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUsername(auth.getName());
        return ratingRepository.existsRatingByCompanyAndUser(company, user);
    }

    public Double getAverageRating(Company company){
        List<Integer> values = ratingRepository.findByCompany(company)
                .stream()
                .map(Rating::getValue)
                .collect(Collectors.toList());
        return values
                .stream()
                .mapToDouble(a -> a)
                .average()
                .orElse(0.0);
    }
}

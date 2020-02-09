package com.itransition.croudfunding.repository;
import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.Rating;
import com.itransition.croudfunding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    List<Rating> findByCompany(Company company);
    Rating findByCompanyAndUser(Company company, User user);
    boolean existsRatingByCompanyAndUser(Company company, User user);
}

package com.itransition.croudfunding.repository;

import com.itransition.croudfunding.entity.Categories;
import com.itransition.croudfunding.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByAuthorId(long id);

    List<Company> findByCategories(Categories categories);

    Company findCompanyById(long id);

    List<Company> findTop3ByOrderByRatingDesc();

    List<Company> deleteByAuthorId(long id);
}

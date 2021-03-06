package com.itransition.croudfunding.repository;

import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByCompany(Company company);
}

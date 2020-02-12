package com.itransition.croudfunding.repository;

import com.itransition.croudfunding.entity.Bonus;
import com.itransition.croudfunding.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BonusRepository extends JpaRepository<Bonus, Long> {

    List<Bonus> findByCompany(Company company);

    Bonus findById(long id);


}

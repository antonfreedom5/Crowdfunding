package com.itransition.croudfunding.service;

import com.itransition.croudfunding.entity.Bonus;
import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.repository.BonusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BonusService {

    @Autowired
    private BonusRepository bonusRepository;

    public Bonus findById(long bonusId) {
        return bonusRepository.findById(bonusId);
    }

    public List<Bonus> findByCompany(Company company) {
        return bonusRepository.findByCompany(company);
    }

    public void save(Bonus bonus) {
        bonusRepository.save(bonus);
    }

    public void deleteBonusById(Long id){
        bonusRepository.deleteById(id);
    }
}

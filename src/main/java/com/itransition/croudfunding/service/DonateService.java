package com.itransition.croudfunding.service;

import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.Donate;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.repository.DonateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonateService {

    @Autowired
    DonateRepository donateRepository;

    @Autowired
    UserService userService;

    public void save(Company company, int sumDonat){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUsername(authentication.getName());
        donateRepository.save(new Donate(sumDonat, user, company));
    }

    public List<Donate> get5latestDonates(){
        return donateRepository.findFirst5ByOrderByIdDesc();
    }
}

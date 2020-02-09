package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.Donate;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.service.CompanyService;
import com.itransition.croudfunding.service.DonateService;
import com.itransition.croudfunding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class DonateController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserService userService;

    @Autowired
    DonateService donateService;

    @PostMapping("/donate/{id}")
    public void donate(@PathVariable Long id, @RequestBody int sumDonate) {
        System.out.println(id + " " + sumDonate);
        Company company = companyService.findCompanyById(id);
        donateService.save(company, sumDonate);
        company.setReached(company.getReached() + sumDonate);
        companyService.saveCompany(company);
    }
}

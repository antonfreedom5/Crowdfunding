package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.Bonus;
import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.Donate;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class DonateController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    DonateService donateService;

    @Autowired
    BonusService bonusService;

    @Autowired
    HistoryService historyService;

    @GetMapping("/bonuses/{companyId}")
    public List<Bonus> getBonusesByCompanyId(@PathVariable Long companyId){
        return bonusService.findByCompany(companyService.findCompanyById(companyId));
    }

    @PostMapping("addbonus/{companyId}")
    public List<Bonus> addBonus(@PathVariable Long companyId, @RequestBody Bonus bonus) {
        bonus.setCompany(companyService.findCompanyById(companyId));
        bonusService.save(bonus);
        return bonusService.findByCompany(companyService.findCompanyById(companyId));
    }

    @PostMapping("/buy")
    public void buyBonus(@RequestBody Long bonusId){
        Bonus bonus = bonusService.findById(bonusId);
        Company company = bonus.getCompany();
        company.setReached(company.getReached() + bonus.getCost());
        companyService.saveCompany(company);
        historyService.save(bonus);
    }

    @PostMapping("/donate/{id}")
    public void donate(@PathVariable Long id, @RequestBody int sumDonate) {
        Company company = companyService.findCompanyById(id);
        donateService.save(company, sumDonate);
        company.setReached(company.getReached() + sumDonate);
        companyService.saveCompany(company);
    }

    @DeleteMapping("/bonus-delete/{bonusId}")
    @Transactional
    public String deleteBonusById(@PathVariable Long bonusId) {
        System.out.println(bonusId);
        bonusService.deleteBonusById(bonusId);
        return "Succsses";
    }
}

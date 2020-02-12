package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.*;
import com.itransition.croudfunding.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
public class CompanyController {

    @Autowired
    UserService userService;

    @Autowired
    CompanyService companyService;

    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    RatingService ratingService;

    @Autowired
    BonusService bonusService;

    @Autowired
    private YouTubeService youTubeService;

    @GetMapping("/")
    public List<Company> getFirstPage() {
        return companyService.findTop3ByRating();
    }

    @GetMapping("/allcompanies")
    public List<Company> getAllCompanies(){ return companyService.getAll();
    }

    @GetMapping("/company/{id}")
    public Company getCompanyById(@PathVariable Long id){
        Company company = companyService.findCompanyById(id);
        String videoLink = company.getVideoLink();
        company.setVideoLink(youTubeService.adaptLink(videoLink));
        companyService.saveCompany(company);
        return companyService.findCompanyById(id);
    }

    @GetMapping("/allcategories")
    public Categories[] getAllCategories(){
        return Categories.values();
    }

    @PostMapping("/addcompany/{category}")
    public @ResponseBody void addCompany(@RequestBody Company company, @PathVariable String category) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User author = userService.findUserByUsername(authentication.getName());
        company.setCategories(new HashSet<Categories>(Collections.singleton(Categories.valueOf(category))));
        company.setAuthor(author);
       companyService.saveCompany(company);
    }

    @PostMapping("/company-edit/{id}")
    public void editCompany(@PathVariable Long id, @RequestBody Company company) {
        Company companyToEdit = companyService.findCompanyById(id);
        companyService.editCompany(companyToEdit, company);
        companyService.saveCompany(companyToEdit);
    }

    @PostMapping("rating/{companyId}")
    public String setRating(@PathVariable Long companyId, @RequestBody int rating) {
        Company company = companyService.findCompanyById(companyId);
        if (ratingService.existsRatingByCompanyAndUser(company)){
            return null;
        }
            ratingService.save(company, rating);
            company.setRating(ratingService.getAverageRating(company).intValue());
            companyService.saveCompany(company);
            return "Successful";
    }

    @DeleteMapping("/company-delete/{id}")
    @Transactional
    public List<Company> deleteCompanyById(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return companyService.getAll();
    }

}

package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.Categories;
import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.Rating;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
        return companyService.findCompanyById(id);
    }

    @GetMapping("/allcategories")
    public Categories[] getAllCategories(){
        return Categories.values();
    }

    @GetMapping("companies/{category}")
    public List<Company> getCompaniesByCategory(@PathVariable String category){
        return companyService.findByCategories(Categories.valueOf(category));
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

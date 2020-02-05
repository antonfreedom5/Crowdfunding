package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class CompanyController {

    @Autowired
    UserService userService;

    @Autowired
    CompanyService companyService;

    @Autowired
    ImageService imageService;

    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    private YouTubeService youTubeService;

    @GetMapping("/")
    public List<Company> getFirstPage() {
        return companyService.findTop3ByRating();
    }

    @GetMapping("/allcompanies")
    public List<Company> getAllCompanies(){
        return companyService.getAll();
    }

    @GetMapping("/company/{id}")
    public Company getCompanyById(@PathVariable Long id){
        return companyService.findCompanyById(id);
    }

    @PostMapping("/addcompany")
    public @ResponseBody void addCompany(@RequestBody Company company) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User author = userService.findUserByUsername(authentication.getName());
        company.setAuthor(author);
       companyService.saveCompany(company);
    }

    @PostMapping("/company-edit/{id}")
    public void editCompany(@PathVariable Long id, @RequestBody Company company) {
        Company companyToEdit = companyService.findCompanyById(id);
        companyService.editCompany(companyToEdit, company);
        companyService.saveCompany(companyToEdit);
    }
}

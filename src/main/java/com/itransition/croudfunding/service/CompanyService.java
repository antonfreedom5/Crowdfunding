package com.itransition.croudfunding.service;

import com.itransition.croudfunding.entity.Categories;
import com.itransition.croudfunding.entity.Company;
import com.itransition.croudfunding.repository.CompanyRepository;
import com.itransition.croudfunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Company> getAll() { return companyRepository.findAll(); }

    public List<Company> deleteByAuthorId(Long id) {
        return companyRepository.deleteByAuthorId(id);
    }

    public Company findCompanyById(long projectId) { return companyRepository.findCompanyById(projectId); }

    public List<Company> findByCategories(Categories category) {
        return companyRepository.findByCategories(category);
    }

    public List<Company> findTop3ByRating() {
        return companyRepository.findTop3ByOrderByRatingDesc();
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }

    public void saveCompany(Company company) {
       companyRepository.save(company);
    }

    public void editCompany(Company companyToEdit, Company company) {
        companyToEdit.setCompanyName(company.getCompanyName());
        companyToEdit.setCategories(company.getCategories());
        companyToEdit.setGoal(company.getGoal());
        companyToEdit.setVideoLink(company.getVideoLink());
        companyToEdit.setDurationDate(company.getDurationDate());
        companyToEdit.setShortDisc(company.getShortDisc());
        companyToEdit.setFullDisc(company.getFullDisc());
        companyToEdit.setPicURLs(company.getPicURLs());
    }

    public void deleteListOfCompanies(List<Company> companies) {
        for (Company company : companies) {
            companyRepository.delete(company);
        }
    }
}

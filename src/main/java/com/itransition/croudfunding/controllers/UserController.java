package com.itransition.croudfunding.controllers;

import com.itransition.croudfunding.models.User;
import com.itransition.croudfunding.repository.CompanyRepository;
import com.itransition.croudfunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyRepository companyRepository;

    @GetMapping("/userlist")
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    @DeleteMapping("/cancel/{id}")
    @Transactional
    public List<User> cancelRegistration(@PathVariable long id) {
        companyRepository.deleteByAuthorId(id);
        userRepository.deleteById(id);
        return userRepository.findAll();
    }
}

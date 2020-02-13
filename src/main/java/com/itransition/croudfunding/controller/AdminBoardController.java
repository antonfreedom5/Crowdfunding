package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.Role;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.repository.CompanyRepository;
import com.itransition.croudfunding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/users")
public class AdminBoardController {

    @Autowired
    UserService userService;

    @Autowired
    CompanyRepository companyRepository;

    @GetMapping("/userlist")
    public List<User> findAllUsers() {
        return userService.findAll();
    }

    @PutMapping("/save")
    public void saveUser(@RequestBody User user) {
    }

    @DeleteMapping("/cancel/{id}")
    @Transactional
    public List<User> cancelRegistration(@PathVariable long id) {
        companyRepository.deleteByAuthorId(id);
        userService.deleteById(id);
        return userService.findAll();
    }

    @PatchMapping("/revertActivationStatus")
    public User revertActivationStatus(@RequestBody User user) {
        User modified = userService.findById(user.getId());
        modified.setActive(!modified.isActive());
        userService.saveOrUpdate(modified);
        return modified;
    }

    @PatchMapping("/makeAdmin")
    public User makeAdmin(@RequestBody User user) {
        User modified = userService.findById(user.getId());
        Set<Role> modifiedRoles = modified.getRoles();
        modifiedRoles.add(Role.ADMIN);
        userService.saveOrUpdate(modified);
        return modified;
    }
}

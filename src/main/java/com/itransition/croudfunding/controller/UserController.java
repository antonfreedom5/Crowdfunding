package com.itransition.croudfunding.controller;

import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getUserInfo/{id}")
    public User getUserInfo(@PathVariable long id) {
        return userService.findById(id);
    }

    @PatchMapping("/saveAvatar")
    public User saveUser(@RequestBody User user) {
        User modified = userService.findById(user.getId());
        modified.setAvatarURL(user.getAvatarURL());
        userService.save(modified);
        return modified;
    }
}

package com.itransition.croudfunding.service;

import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public long findIdByUsername(String username) {
        return userRepository.findByUsername(username).get().getId();
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public void saveOrUpdate(User user) {
        Optional<User> existing = userRepository.findById(user.getId());
        if (existing.isPresent()) {
            updateEntry(existing.get(), user);
        } else
        userRepository.save(user);
    }

    private void updateEntry(User updatable, User update) {

    }


    public User findUserByUsername(String name) {
        return userRepository.findUserByUsername(name);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void deleteById(long id) {
        userRepository.deleteById(id);
    }
}

package com.itransition.croudfunding.service;

import com.itransition.croudfunding.entity.Bonus;
import com.itransition.croudfunding.entity.Donate;
import com.itransition.croudfunding.entity.History;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private UserService userService;

    public List<History> findByUser(User user) {
        return historyRepository.findByUser(user);
    }

    public void save(Bonus bonus) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUsername(authentication.getName());
        historyRepository.save(new History(bonus, user));
    }
}

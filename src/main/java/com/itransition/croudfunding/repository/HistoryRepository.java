package com.itransition.croudfunding.repository;

import com.itransition.croudfunding.entity.History;
import com.itransition.croudfunding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History> findByUser(User user);
}

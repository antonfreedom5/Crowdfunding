package com.itransition.croudfunding.services;

import org.springframework.stereotype.Service;

@Service
public class YouTubeService {
    public String adaptLink(String url) {
        return url.replace("watch?v=", "embed/");
    }
}

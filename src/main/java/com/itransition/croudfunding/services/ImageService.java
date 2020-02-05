package com.itransition.croudfunding.services;

import com.itransition.croudfunding.models.Company;
import com.itransition.croudfunding.models.Image;
import com.itransition.croudfunding.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    @Autowired
    ImageRepository imageRepository;

    public void saveImage(Company company, String url) {
        imageRepository.save(new Image(company, url));
    }

    public List<String> getUrlsOfCompany(Company company) {
        return imageRepository.findByCompany(company).stream()
                .map(Image::getUrl)
                .collect(Collectors.toList());
    }
}

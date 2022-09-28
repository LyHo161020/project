package com.cg.cinestar.controller.api;

import com.cg.cinestar.model.Size;
import com.cg.cinestar.service.size.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/sizes")
public class SizeAPI {

    @Autowired
    private ISizeService sizeService;

    @GetMapping()
    public ResponseEntity<?> showListSize() {
        List<Size> sizes = sizeService.findAll();

        if(sizes.isEmpty()) {
            return new ResponseEntity<>("List is empty!", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sizes, HttpStatus.OK);
    }
}
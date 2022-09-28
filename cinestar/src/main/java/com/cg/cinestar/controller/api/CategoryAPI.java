package com.cg.cinestar.controller.api;

import com.cg.cinestar.model.Category;
import com.cg.cinestar.model.dto.MovieDTO;
import com.cg.cinestar.service.category.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/categories")
public class CategoryAPI {

    @Autowired
    ICategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getAllCategories(){
        List<Category> categories = categoryService.findAll();
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<?> getAllCategoriesByFilmId(@PathVariable String id){
        List<Category> categories = categoryService.findAllCategoriesByFilmId(id);
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}

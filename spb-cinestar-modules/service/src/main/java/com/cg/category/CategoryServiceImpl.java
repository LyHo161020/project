package com.cg.category;

import com.cg.CategoryRepository;
import com.cg.MovieRepository;

import com.cg.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService{

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MovieRepository movieRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Long id) {

        return categoryRepository.findById(id);
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public Category save(Category category) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public List<Category> findAllCategoriesByFilmId(String id) {
        return movieRepository.findAllCategoriesByFilmId(id);
    }
}

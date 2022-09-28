package com.cg.cinestar.controller.api;

import com.cg.cinestar.exception.DataInputException;
import com.cg.cinestar.exception.ResourceNotFoundException;
import com.cg.cinestar.model.FileMedia;
import com.cg.cinestar.model.dto.MovieDTO;
import com.cg.cinestar.repository.FileMediaRepository;
import com.cg.cinestar.repository.MovieRepository;
import com.cg.cinestar.service.category.ICategoryService;
import com.cg.cinestar.service.movie.IMovieService;
import com.cg.cinestar.model.Movie;
import com.cg.cinestar.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.*;


@RestController
@RequestMapping("/api/movies")
public class MovieAPI {

    @Autowired
    IMovieService movieService;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    ICategoryService categoryService;

    @Autowired
    FileMediaRepository fileMediaRepository;

    @Autowired
    AppUtils appUtils;


    @GetMapping
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> findAllMovies(){
        List<MovieDTO> movies = movieService.findAllIMovieDTOByDeletedIsFalse();
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        for (MovieDTO movieDTO: movies) {
            movieDTO.setCategories(categoryService.findAllCategoriesByFilmId(movieDTO.getId()).toString());
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> findMovieDTOById(@PathVariable String id){

        MovieDTO movieDTO = movieService.findMovieDTOById(id);

        if (movieDTO == null) {
            throw new ResourceNotFoundException("No movie found with the Id: " + id);
        }

        movieDTO.setCategories(categoryService.findAllCategoriesByFilmId(movieDTO.getId()).toString());

        return new ResponseEntity<>(movieDTO, HttpStatus.OK);

    }

    @PostMapping("/create")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> create(@Valid MovieDTO movieDTO, BindingResult bindingResult){

        if (bindingResult.hasFieldErrors()){
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        String categories = movieDTO.getCategories();
        movieDTO.setId("0");

        try {
            Movie movieCreated = movieService.create(movieDTO);
            Optional<FileMedia> movieMedia = fileMediaRepository.findByMovie(movieCreated);

            movieDTO = movieCreated.toMovieDTO()
                    .setCategories(categories)
                    .setFileUrl(movieMedia.get().getFileUrl());

            return new ResponseEntity<>(movieDTO, HttpStatus.CREATED);

        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            throw new DataInputException("Invalid creation information, please check the information again!");
        }

    }

    @PutMapping("/update")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> update(@Valid MovieDTO movieDTO, BindingResult bindingResult){

        if(bindingResult.hasFieldErrors()){
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        Optional<Movie> movie = movieRepository.findById(movieDTO.getId());

        if(!movie.isPresent()){
            throw new ResourceNotFoundException("not found.");
        }
        String categories = movieDTO.getCategories();
        try {

            Movie movieUpdated = movieService.update(movieDTO);
            Optional<FileMedia> movieMedia = fileMediaRepository.findByMovie(movieUpdated);

            movieDTO = movieUpdated.toMovieDTO().setCategories(categories);
            movieDTO.setFileUrl(movieMedia.get().getFileUrl());

            return new ResponseEntity<>(movieDTO, HttpStatus.CREATED);

        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            throw new DataInputException("Invalid creation information, please check the information again!");
        }

    }

    @DeleteMapping("/delete/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> doDelete(@PathVariable String id) {
        Optional<Movie> movie = movieRepository.findById(id);

        if (movie.isPresent()) {
            try {
                movie.get().setDeleted(true);
                movieService.save(movie.get());

                return new ResponseEntity<>(HttpStatus.ACCEPTED);

            } catch (DataIntegrityViolationException e) {
                throw new DataInputException("Delete fail.");
            }
        } else {
            throw new DataInputException("Invalid movie information");
        }
    }

    @GetMapping("/search/{keyword}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> searchMovie(@PathVariable String keyword){

        List<MovieDTO> movies = movieRepository.searchMovie(keyword);

        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        for (MovieDTO movieDTO: movies) {
            movieDTO.setCategories(categoryService.findAllCategoriesByFilmId(movieDTO.getId()).toString());
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

}

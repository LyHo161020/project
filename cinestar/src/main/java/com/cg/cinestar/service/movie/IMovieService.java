package com.cg.cinestar.service.movie;

import com.cg.cinestar.model.Movie;
import com.cg.cinestar.model.dto.IMovieDTO;
import com.cg.cinestar.model.dto.MovieDTO;
import com.cg.cinestar.service.IGeneralService;

import java.util.List;
import java.util.Optional;


public interface IMovieService extends IGeneralService<Movie> {

//    List<IMovieDTO> findAllIMovieDTOByDeletedIsFalse();

    List<MovieDTO> findAllIMovieDTOByDeletedIsFalse();
    Movie create(MovieDTO movieDTO);

    Movie update(MovieDTO movieDTO);

    MovieDTO findMovieDTOById(String id);

    boolean checkValidMovieId(String id);
}

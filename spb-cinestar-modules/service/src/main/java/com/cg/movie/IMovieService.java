package com.cg.movie;

import com.cg.IGeneralService;
import com.cg.dto.MovieDTO;
import com.cg.entity.Movie;

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

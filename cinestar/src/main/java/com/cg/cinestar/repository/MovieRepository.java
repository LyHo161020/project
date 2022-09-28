package com.cg.cinestar.repository;

import com.cg.cinestar.model.Category;
import com.cg.cinestar.model.Movie;
import com.cg.cinestar.model.dto.IMovieDTO;
import com.cg.cinestar.model.dto.MovieDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

    @Query("SELECT NEW com.cg.cinestar.model.dto.MovieDTO (" +
            "fm.movie.id, " +
            "fm.movie.title, " +
            "fm.movie.premiereDate, " +
            "fm.movie.showDuration, " +
            "fm.movie.director, " +
            "fm.movie.actor, " +
            "fm.movie.language, " +
            "fm.movie.description, " +
            "fm.movie.trailer, " +
            "fm.fileFolder, " +
            "fm.fileName, " +
            "fm.fileType, " +
            "fm.fileUrl " +
            ") " +
            "FROM FileMedia fm " +
            "WHERE fm.movie.deleted = false"
    )
    List<MovieDTO> findAllIMovieDTOByDeletedIsFalse();


    @Query("SELECT NEW com.cg.cinestar.model.dto.MovieDTO  (" +
            "fm.movie.id, " +
            "fm.movie.title, " +
            "fm.movie.premiereDate, " +
            "fm.movie.showDuration, " +
            "fm.movie.director, " +
            "fm.movie.actor, " +
            "fm.movie.language, " +
            "fm.movie.description, " +
            "fm.movie.trailer, " +
            "fm.fileFolder, " +
            "fm.fileName, " +
            "fm.fileType, " +
            "fm.fileUrl " +
            ") " +
            "FROM FileMedia fm " +
            "WHERE fm.movie.deleted = false " +
            "AND fm.movie.id = ?1 "
    )
    MovieDTO findMovieDTOById(String id);



    @Query("SELECT m.categories FROM Movie m WHERE m.id = :id")
    List<Category> findAllCategoriesByFilmId(String id);


    @Query("SELECT NEW com.cg.cinestar.model.dto.MovieDTO  (" +
                "fm.movie.id, " +
                "fm.movie.title, " +
                "fm.movie.premiereDate, " +
                "fm.movie.showDuration, " +
                "fm.movie.director, " +
                "fm.movie.actor, " +
                "fm.movie.language, " +
                "fm.movie.description, " +
                "fm.movie.trailer, " +
                "fm.fileFolder, " +
                "fm.fileName, " +
                "fm.fileType, " +
                "fm.fileUrl " +
            ") " +
            "FROM FileMedia fm " +
            "WHERE fm.movie.deleted = false " +
            "AND CONCAT(" +
                "fm.movie.id, " +
                "fm.movie.title, " +
                "fm.movie.premiereDate, " +
                "fm.movie.showDuration, " +
                "fm.movie.director, " +
                "fm.movie.actor, " +
                "fm.movie.language " +
            ") " +
            "LIKE %?1%"
    )
    List<MovieDTO> searchMovie(String keyword);

}

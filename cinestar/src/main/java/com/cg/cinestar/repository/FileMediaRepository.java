package com.cg.cinestar.repository;

import com.cg.cinestar.model.FileMedia;
import com.cg.cinestar.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface FileMediaRepository extends JpaRepository<FileMedia, String> {
    Optional<FileMedia> findByMovie(Movie movie);

}

package com.cg;

import com.cg.entity.FileMedia;
import com.cg.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface FileMediaRepository extends JpaRepository<FileMedia, String> {
    Optional<FileMedia> findByMovie(Movie movie);

}

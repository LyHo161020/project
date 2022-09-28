package com.cg.movie;

import com.cg.DataInputException;
import com.cg.FileMediaRepository;
import com.cg.MovieRepository;
import com.cg.UploadUtils;
import com.cg.dto.MovieDTO;
import com.cg.entity.Category;
import com.cg.entity.FileMedia;
import com.cg.entity.Movie;
import com.cg.enums.FileType;
import com.cg.upload.IUploadService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
@Transactional
public class MovieServiceImpl implements IMovieService{

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    FileMediaRepository fileMediaRepository;

    @Autowired
    IUploadService uploadService;


    @Autowired
    UploadUtils uploadUtils;

    @Override
    public List<Movie> findAll() {

        return movieRepository.findAll();
    }

    @Override
    public Optional<Movie> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Movie getById(Long id) {
        return null;
    }

    @Override
    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public List<MovieDTO> findAllIMovieDTOByDeletedIsFalse() {
        return movieRepository.findAllIMovieDTOByDeletedIsFalse();
    }

    @Override
    public Movie create(MovieDTO movieDTO) {

        String categories = movieDTO.getCategories();

        ObjectMapper mapper = new ObjectMapper();

        List<Category> categoryList;
        try {
            categoryList = Arrays.asList(mapper.readValue(categories, Category[].class));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        String fileType = movieDTO.getFile().getContentType();

        assert fileType != null;

        fileType = fileType.substring(0, 5);

        movieDTO.setFileType(fileType);

        Movie movie = movieRepository.save(movieDTO.toMovie().setCategories(categoryList));

        FileMedia movieMedia = fileMediaRepository.save(movieDTO.toFileMedia());

        if (fileType.equals(FileType.IMAGE.getValue())) {
            uploadAndSaveProductImage(movieDTO, movie, movieMedia);
        }

        if (fileType.equals(FileType.VIDEO.getValue())) {
            uploadAndSaveProductVideo(movieDTO, movie, movieMedia);
        }

        return movie;
    }

    @Override
    public Movie update(MovieDTO movieDTO) {

        String categories = movieDTO.getCategories();

        ObjectMapper mapper = new ObjectMapper();

        List<Category> categoryList;
        try {
            categoryList = Arrays.asList(mapper.readValue(categories, Category[].class));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Movie movie = movieRepository.save(movieDTO.toMovie().setCategories(categoryList));

        FileMedia fileMedia = fileMediaRepository.findByMovie(movie).get();


        if(movieDTO.getFile() != null){
            String fileType = movieDTO.getFile().getContentType();

            assert fileType != null;

            fileType = fileType.substring(0, 5);

            movieDTO.setFileType(fileType);

            if (fileType.equals(FileType.IMAGE.getValue())) {
                uploadAndSaveProductImage(movieDTO, movie, fileMedia);
            }

            if (fileType.equals(FileType.VIDEO.getValue())) {
                uploadAndSaveProductVideo(movieDTO, movie, fileMedia);
            }

        }

        return movie;
    }

    @Override
    public MovieDTO findMovieDTOById(String id) {
        return movieRepository.findMovieDTOById(id);
    }

    @Override
    public boolean checkValidMovieId(String id) {
        List<Movie> movies = findAll();

        for (Movie movie : movies) {
            if(movie.getId().equals(id)) {
                return false;
            }
        }
        return true;
    }

    private void uploadAndSaveProductImage(MovieDTO movieDTO, Movie movie, FileMedia movieMedia) {
        try {
            Map uploadResult = uploadService.uploadImage(movieDTO.getFile(), uploadUtils.buildImageUploadParams(movieMedia));
            String fileUrl = (String) uploadResult.get("secure_url");
            String fileFormat = (String) uploadResult.get("format");

            movieMedia.setFileName(movieMedia.getId() + "." + fileFormat);
            movieMedia.setFileUrl(fileUrl);
            movieMedia.setFileFolder(UploadUtils.IMAGE_UPLOAD_FOLDER);
            movieMedia.setCloudId(movieMedia.getFileFolder() + "/" + movieMedia.getId());
            movieMedia.setMovie(movie);
            fileMediaRepository.save(movieMedia);

        } catch (IOException e) {
            e.printStackTrace();
            throw new DataInputException("Upload hình ảnh thất bại");
        }
    }

    private void uploadAndSaveProductVideo(MovieDTO movieDTO, Movie movie, FileMedia movieMedia) {
        try {
            Map uploadResult = uploadService.uploadVideo(movieDTO.getFile(), uploadUtils.buildVideoUploadParams(movieMedia));
            String fileUrl = (String) uploadResult.get("secure_url");
            String fileFormat = (String) uploadResult.get("format");

            movieMedia.setFileName(movieMedia.getId() + "." + fileFormat);
            movieMedia.setFileUrl(fileUrl);
            movieMedia.setFileFolder(UploadUtils.VIDEO_UPLOAD_FOLDER);
            movieMedia.setCloudId(movieMedia.getFileFolder() + "/" + movieMedia.getId());
            movieMedia.setMovie(movie);
            fileMediaRepository.save(movieMedia);

        } catch (IOException e) {
            e.printStackTrace();
            throw new DataInputException("Upload video thất bại");
        }
    }

}

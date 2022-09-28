package com.cg;

import com.cg.branch.IBranchService;
import com.cg.dto.MovieDTO;
import com.cg.entity.Branch;
import com.cg.movie.IMovieService;
import com.cg.show_schedule.IShowScheduleService;
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
@RequestMapping("/api/branches")
public class BranchAPI {
    @Autowired
    private IBranchService branchService;

    @Autowired IShowScheduleService showScheduleService;

    @Autowired IMovieService movieService;

    @GetMapping
    public ResponseEntity<?> findAllBranch() {
        List<Branch> branches = branchService.findAll();

        if(branches.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(branches, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findAllBranchByMovieId(@PathVariable String id) {
        MovieDTO movieDTO = movieService.findMovieDTOById(id);

        if(movieDTO == null) {
            return new ResponseEntity<>("Id khong ton tai", HttpStatus.BAD_REQUEST);
        }

        Set<Branch> branches = showScheduleService.findAllBranchByMovie(id);

        if(branches.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(branches, HttpStatus.OK);
    }

}

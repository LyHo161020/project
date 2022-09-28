package com.cg.cinestar.controller.api;


import com.cg.cinestar.model.*;
import com.cg.cinestar.model.dto.MovieDTO;
import com.cg.cinestar.model.dto.ShowScheduleDTO;

import com.cg.cinestar.model.FileMedia;
import com.cg.cinestar.model.ShowSchedule;
import com.cg.cinestar.model.dto.ShowScheduleDetailsDTO;
import com.cg.cinestar.repository.FileMediaRepository;

import com.cg.cinestar.repository.ShowScheduleRepository;
import com.cg.cinestar.service.branch.IBranchService;
import com.cg.cinestar.service.movie.IMovieService;
import com.cg.cinestar.service.room.IRoomService;
import com.cg.cinestar.service.show_schedule.IShowScheduleService;
import com.cg.cinestar.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/show-schedules")
public class ShowScheduleAPI {
    @Autowired
    private IMovieService movieService;

    @Autowired
    private IBranchService branchService;

    @Autowired
    private IRoomService roomService;

    @Autowired
    FileMediaRepository fileMediaRepository;

    @Autowired
    private IShowScheduleService showScheduleService;

    @Autowired
    private ShowScheduleRepository showScheduleRepository;

    @GetMapping
    public ResponseEntity<?> getDataLength() {

        Integer dataLength = showScheduleRepository.getDataLength();

        return new ResponseEntity<>(dataLength, HttpStatus.OK);
    }

    @GetMapping("/paging/{pageCurrent}/{pageSize}")
    public ResponseEntity<?> showListShowSchedule(@PathVariable String pageCurrent, @PathVariable String pageSize) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageCurrent) , Integer.parseInt(pageSize));
        Page<ShowScheduleDTO> showScheduleDTOS = showScheduleRepository.findAllShowScheduleDTOPaging(pageable);

        if(showScheduleDTOS.isEmpty()) {
            return new ResponseEntity<>("danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showScheduleDTOS.getContent(), HttpStatus.OK);
    }

    @GetMapping("/branch/{id}")
    public ResponseEntity<?> findShowScheduleDetailsFTOListByBranch(@PathVariable Long id) {
            List<ShowScheduleDetailsDTO> showScheduleDetailsDTOS = showScheduleService.findAllShowScheduleDetailsDTOByBranchId(id);

        if(showScheduleDetailsDTOS.isEmpty()) {
            return new ResponseEntity<>("danh sach trong", HttpStatus.NO_CONTENT);
        }

        for (ShowScheduleDetailsDTO scDTO: showScheduleDetailsDTOS) {
            Optional<FileMedia> movieMedia = fileMediaRepository.findByMovie(scDTO.getMovie().toMovie());
            scDTO.getMovie().setFileUrl(movieMedia.get().getFileUrl());
        }

        return new ResponseEntity<>(showScheduleDetailsDTOS, HttpStatus.OK);
    }

    @GetMapping("/branch/showdate/{branchId}/{movieId}")
    public ResponseEntity<?> findByBranchAndMovieGroupByMovieAndShowDate(@PathVariable Long branchId, @PathVariable String movieId) {
        List<ShowScheduleDetailsDTO> showScheduleDetailsDTOS = showScheduleRepository.findByBranchAndMovieGroupByMovieAndShowDate(branchId, movieId);

        if(showScheduleDetailsDTOS.isEmpty()) {
            return new ResponseEntity<>("danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showScheduleDetailsDTOS, HttpStatus.OK);
    }

    @GetMapping("/branch/showtimeslot/{branchId}/{movieId}/{showDate}")
    public ResponseEntity<?> findSCGroupByMovieAndShowDateAndShowTimeSlot(@PathVariable Long branchId, @PathVariable String movieId, @PathVariable String showDate) {
        List<ShowScheduleDetailsDTO> showScheduleDetailsDTOS = showScheduleRepository.findSCGroupByMovieAndShowDateAndShowTimeSlot(branchId, movieId, showDate);

        if(showScheduleDetailsDTOS.isEmpty()) {
            return new ResponseEntity<>("danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showScheduleDetailsDTOS, HttpStatus.OK);
    }

    @GetMapping("/{roomId}/{showDate}")
    public ResponseEntity<?> findALlScheduleByRoomAndShowDate(@PathVariable Long roomId, @PathVariable String showDate) {
        List<ShowScheduleDetailsDTO> showScheduleDetailsDTOS = showScheduleRepository.findALlScheduleByRoomAndShowDate(roomId, showDate);

        if(showScheduleDetailsDTOS.isEmpty()) {
            return new ResponseEntity<>("danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showScheduleDetailsDTOS, HttpStatus.OK);
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Long id) {
        Optional<ShowScheduleDTO> showScheduleDTO = showScheduleService.findShowScheduleDTOById(id);

        if (!showScheduleDTO.isPresent()) {
            return new ResponseEntity<>("Wine ID :" + id + "not found" + "!", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(showScheduleDTO, HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<?> doCreate(@Validated @RequestBody ShowScheduleDTO showScheduleDTO, BindingResult bindingResult) {

        bindingResult = showScheduleService.checkValidShowSchedule(bindingResult, showScheduleDTO);

        if (bindingResult.hasErrors()) {
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        try {
            ShowSchedule showSchedule = showScheduleDTO.toShowSchedule();
            showSchedule.setId(0L);

            showSchedule = showScheduleService.setInfoShowSchedule(showSchedule, showScheduleDTO);

            showSchedule = showScheduleService.save(showSchedule);

            return new ResponseEntity<>(showSchedule.toShowScheduleDTO(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Server ko xử lý được", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> doUpdateShowSchedule(@PathVariable Long id,@Validated @RequestBody ShowScheduleDTO showScheduleDTO,
                                             BindingResult bindingResult) {

        bindingResult = showScheduleService.checkValidShowSchedule(bindingResult, showScheduleDTO);

        Optional<ShowSchedule> s = showScheduleService.findById(id);

        if (!s.isPresent()) {
            return new ResponseEntity<>("This account is not found!", HttpStatus.NOT_FOUND);
        }


        if (bindingResult.hasErrors()) {
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        try {
            ShowSchedule showSchedule = showScheduleDTO.toShowSchedule();
            showSchedule.setId(id);

            showSchedule = showScheduleService.setInfoShowSchedule(showSchedule, showScheduleDTO);

            showScheduleService.save(showSchedule);


            return new ResponseEntity<>(showSchedule.toShowScheduleDTO(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Server error!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> doDelete(@PathVariable Long id){
        Optional<ShowScheduleDTO> showScheduleDTO = showScheduleService.findShowScheduleDTOById(id);

        if (!showScheduleDTO.isPresent()) {
            return new ResponseEntity<>("Không tìm thấy customer có id là:" + id + "!", HttpStatus.NO_CONTENT);
        }

        try{
            showScheduleService.deleteShowScheduleById(id);

            return new ResponseEntity<>(id,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Server không xử lý được", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody String searchInput) {
        searchInput = searchInput.replace('"',' ').trim().toLowerCase();
        List<ShowScheduleDTO> listSearch = showScheduleService.search(searchInput);

        if(listSearch.size() == 0) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listSearch,HttpStatus.OK);
    }



    @GetMapping("/rooms/{movieId}/{branchId}")
    public ResponseEntity<?> findAllRoomByMovieAndBranch(@PathVariable String movieId, @PathVariable Long branchId) {
        MovieDTO movieDTO = movieService.findMovieDTOById(movieId);

        if(movieDTO == null) {
            return new ResponseEntity<>("Id khong ton tai", HttpStatus.BAD_REQUEST);
        }

        Set<Room> rooms = showScheduleService.findAllRoomByMovieAndBranch(movieId, branchId);

        if(rooms.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/show-date/{movieId}/{roomId}")
    public ResponseEntity<?> findAllShowDateByMovieAndRoom(@PathVariable String movieId, @PathVariable Long roomId) {
        MovieDTO movieDTO = movieService.findMovieDTOById(movieId);

        if(movieDTO == null) {
            return new ResponseEntity<>("Id khong ton tai", HttpStatus.BAD_REQUEST);
        }

        Set<String> showDates = showScheduleService.findAllShowDateByMovieAndRoom(movieId, roomId);

        if(showDates.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showDates, HttpStatus.OK);
    }

    @GetMapping("/show_date_customer_page/{movieId}/{branchId}")
    public ResponseEntity<?> findAllShowDateByMovieAndBranch(@PathVariable String movieId, @PathVariable Long branchId) {
        MovieDTO movieDTO = movieService.findMovieDTOById(movieId);

        if(movieDTO == null) {
            return new ResponseEntity<>("Id khong ton tai", HttpStatus.BAD_REQUEST);
        }

        Set<String> showDates = showScheduleService.findAllShowDateByMovieAndBranch(movieId, branchId);

        if(showDates.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showDates, HttpStatus.OK);
    }

    @GetMapping("/show-time-slot/{movieId}/{roomId}/{showDate}")
    public ResponseEntity<?> findAllShowTimeSlotBy(@PathVariable String movieId, @PathVariable Long roomId, @PathVariable String showDate) {
        MovieDTO movieDTO = movieService.findMovieDTOById(movieId);

        if(movieDTO == null) {
            return new ResponseEntity<>("Id khong ton tai", HttpStatus.BAD_REQUEST);
        }

        Set<String> showTimeSlots = showScheduleService.findShowTimeSlotsByMovieAndRoomAndShowDate(movieId, roomId,showDate);

        if(showTimeSlots.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showTimeSlots, HttpStatus.OK);
    }

    @GetMapping("/{movieId}/{branchId}/{showTimeSlot}")
    public ResponseEntity<?> findAllShowTimeSlot(@PathVariable String movieId, @PathVariable Long branchId, @PathVariable String showTimeSlot) {
        MovieDTO movieDTO = movieService.findMovieDTOById(movieId);

        if(movieDTO == null) {
            return new ResponseEntity<>("Id khong ton tai", HttpStatus.BAD_REQUEST);
        }

        List<ShowSchedule> showSchedules = showScheduleService.findAllShowTimeSlot(movieId, branchId, showTimeSlot);

        if(showSchedules.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showSchedules, HttpStatus.OK);
    }
}

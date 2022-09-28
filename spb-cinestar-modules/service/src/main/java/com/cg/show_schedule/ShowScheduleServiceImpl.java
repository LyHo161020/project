package com.cg.show_schedule;

import com.cg.BranchRepository;
import com.cg.MovieRepository;
import com.cg.RoomRepository;
import com.cg.ShowScheduleRepository;
import com.cg.branch.IBranchService;
import com.cg.entity.Movie;
import com.cg.entity.Room;
import com.cg.entity.Branch;
import com.cg.entity.ShowSchedule;
import com.cg.movie.IMovieService;
import com.cg.room.IRoomService;
import com.cg.dto.ShowScheduleDetailsDTO;
import com.cg.dto.ShowScheduleDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@Transactional
public class ShowScheduleServiceImpl implements IShowScheduleService{
    @Autowired
    private IMovieService movieService;

    @Autowired
    private IRoomService roomService;

    @Autowired IBranchService branchService;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ShowScheduleRepository showScheduleRepository;

    @Override
    public List<ShowSchedule> findAll() {
        return showScheduleRepository.findAll();
    }

    @Override
    public List<ShowScheduleDTO> findAllShowScheduleDTO() {
        return showScheduleRepository.findAllShowScheduleDTO();
    }
    @Override
    public List<ShowScheduleDetailsDTO> findAllShowScheduleDetailsDTOByBranchId(Long id){
        return showScheduleRepository.findAllShowScheduleDetailsDTOByBranchId(id);
    }

    @Override
    public Optional<ShowScheduleDTO> findShowScheduleDTOById(Long id) {
        return showScheduleRepository.findShowScheduleDTOById(id);
    }

    @Override
    public Optional<ShowSchedule> findById(Long id) {
        return showScheduleRepository.findById(id);
    }

    @Override
    public ShowSchedule getById(Long id) {
        return null;
    }

    @Override
    public ShowSchedule save(ShowSchedule showSchedule) {
        return showScheduleRepository.save(showSchedule);
    }

    @Override
    public void remove(Long id) {
        showScheduleRepository.deleteById(id);
    }

    @Override
    public void deleteShowScheduleById(Long id) {
        showScheduleRepository.deleteShowScheduleById(id);
    }

    @Override
    public Set<Branch> findAllBranchByMovie(String id) {
        return showScheduleRepository.findAllBranchByMovie(id);
    }

    @Override
    public Set<Room> findAllRoomByMovieAndBranch(String movieId, Long branchId) {
        return showScheduleRepository.findAllRoomByMovieAndBranch(movieId,branchId);
    }

    @Override
    public Set<String> findAllShowDateByMovieAndBranch(String movieId, Long branchId) {
        return showScheduleRepository.findAllShowDateByMovieAndBranch(movieId, branchId);
    }

    @Override
    public Set<String> findAllShowDateByMovieAndRoom(String movieId, Long roomId) {
        return showScheduleRepository.findAllShowDateByMovieAndRoom(movieId, roomId);
    }

    @Override
    public List<ShowSchedule> findAllShowTimeSlot(String movieId, Long branchId, String showDate) {
        return showScheduleRepository.findAllShowTimeSlot(movieId, branchId, showDate);
    }

    @Override
    public List<ShowSchedule> findAllShowTimeSlotByRoomAndShowDate(Long id, String showDate) {
        return showScheduleRepository.findAllShowTimeSlotByRoomAndShowDate(id ,showDate);
    }

    @Override
    public Set<String> findShowTimeSlotsByMovieAndRoomAndShowDate(String movieId, Long roomId, String showDate) {
        return showScheduleRepository.findShowTimeSlotsByMovieAndRoomAndShowDate(movieId,roomId,showDate);
    }

    @Override
    public List<ShowScheduleDTO> findAllShowScheduleDTOByMovie(String id) {
        return showScheduleRepository.findAllShowScheduleDTOByMovie(id);
    }

    @Override
    public boolean existsShowScheduleByRoomAndShowDate(Room room , String showDate) {
        return showScheduleRepository.existsShowScheduleByRoomAndShowDate(room,showDate);
    }

    @Override
    public ShowSchedule setInfoShowSchedule(ShowSchedule showSchedule, ShowScheduleDTO showScheduleDTO) {

        Optional<Movie> movie = movieRepository.findById(showScheduleDTO.getMovieId());
        Optional<Branch> branch = branchRepository.findById(Long.parseLong(showScheduleDTO.getBranchId()));
        Optional<Room> room = roomRepository.findById(Long.parseLong(showScheduleDTO.getRoomId()));

        return new ShowSchedule()
                .setId(showSchedule.getId())
                .setMovie(movie.get())
                .setBranch(branch.get())
                .setRoom(room.get())
                .setShowDate(showSchedule.getShowDate())
                .setShowTimeSlot(showSchedule.getShowTimeSlot());
    }

    @Override
    public BindingResult checkValidShowSchedule(BindingResult bindingResult, ShowScheduleDTO showScheduleDTO) {

        if(movieService.checkValidMovieId(showScheduleDTO.getMovieId())) {
            bindingResult.addError(new FieldError("movie","movie","Thông tên phim không hợp lê!"));
            return bindingResult;
        }

        if(branchService.checkValidBranchId(showScheduleDTO.getBranchId())){
            bindingResult.addError(new FieldError("branch","branch","Thông tin chi nhánh không hợp lê!"));
            return bindingResult;

        }

        if(roomService.checkValidRoomId(showScheduleDTO.getRoomId())){
            bindingResult.addError(new FieldError("room","room","Thông tin phòng không hợp lệ!"));
            return bindingResult;

        }

        bindingResult = checkShowTimeSlotByShowSchedule(bindingResult, showScheduleDTO);

        return  bindingResult;
    }

    private BindingResult checkShowTimeSlotByShowSchedule(BindingResult bindingResult, ShowScheduleDTO showScheduleDTO) {
        Optional<Room> room = roomRepository.findById(Long.parseLong(showScheduleDTO.getRoomId()));

        boolean existShowSchedule = existsShowScheduleByRoomAndShowDate(room.get(), showScheduleDTO.getShowDate());

        String showTimeSlot = showScheduleDTO.getShowTimeSlot();
        Optional<Movie> movie = movieRepository.findById(showScheduleDTO.getMovieId());
        int movieStarTime = getMinute(showTimeSlot);
        int movieEndTime = movieStarTime + movie.get().getShowDuration();


        if(movieStarTime < getMinute("08:00") || movieEndTime > getMinute("23:00")) {
            bindingResult.addError(new FieldError("showTimeSlot","showTimeSlot","Giờ chiếu không hợp lệ!"));
            return bindingResult;
        }

        if(existShowSchedule) {

             List<ShowSchedule> showSchedulesOnDay = showScheduleRepository.findAllShowTimeSlotByRoomAndShowDate(Long.parseLong(showScheduleDTO.getRoomId()), showScheduleDTO.getShowDate());

             boolean flag = false;

                for(int i = 0; i < showSchedulesOnDay.size() - 1 ; i++) {
                    int starTimeNext = getMinute(showSchedulesOnDay.get(i + 1).getShowTimeSlot()) - 15;
                    int endTimeCurrent = getMinute(showSchedulesOnDay.get(i).getShowTimeSlot()) + showSchedulesOnDay.get(i).getMovie().getShowDuration() + 15;

                    if(movieStarTime >= endTimeCurrent && movieEndTime <= starTimeNext) {
                        flag = true;
                    }
                }

                int startTimeFirstShowSchedule = getMinute(showSchedulesOnDay.get(0).getShowTimeSlot());

                int endTimeFinishShowSchedule = getMinute(showSchedulesOnDay.get(showSchedulesOnDay.size() - 1 ).getShowTimeSlot()) + showSchedulesOnDay.get(showSchedulesOnDay.size() - 1).getMovie().getShowDuration();

                if(movieStarTime >= getMinute("08:00") && (movieEndTime + 15) <= startTimeFirstShowSchedule) {
                    flag = true;
                }

                if(movieStarTime >= (endTimeFinishShowSchedule + 15) && movieEndTime <= getMinute("23:00")) {
                    flag = true;
                }

                if(!flag){
                    bindingResult.addError(new FieldError("showTimeSlot","showTimeSlot","Trùng giờ chiếu!"));
                }
        }
        return bindingResult;
    }

    public int getMinute(String showTimeSlot) {
        String hour = showTimeSlot.substring(0,2);
        String minutes = showTimeSlot.substring(3);

        return Integer.parseInt(hour) * 60 + Integer.parseInt(minutes);
    }

//    public static void main(String[] args) {
//        String str = "14:30";
//
//        ShowScheduleServiceImpl showScheduleService = new ShowScheduleServiceImpl();
//
//        int minutes = showScheduleService.getMinute(str);
//        System.out.println(minutes);
//    }

    @Override
    public List<ShowScheduleDTO> search(String searchInput) {
        List<ShowScheduleDTO> showScheduleDTOS = findAllShowScheduleDTO();
        List<ShowScheduleDTO> listSearch = new ArrayList<>();

        for(ShowScheduleDTO showScheduleDTO : showScheduleDTOS){
            if(showScheduleDTO.toString().contains(searchInput)){
                listSearch.add(showScheduleDTO);
            }
        }

        return listSearch;
    }


}

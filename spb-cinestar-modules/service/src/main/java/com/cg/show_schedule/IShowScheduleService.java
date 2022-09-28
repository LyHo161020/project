package com.cg.show_schedule;

import com.cg.IGeneralService;
import com.cg.dto.ShowScheduleDTO;
import com.cg.dto.ShowScheduleDetailsDTO;
import com.cg.entity.Branch;
import com.cg.entity.Room;
import com.cg.entity.ShowSchedule;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IShowScheduleService extends IGeneralService<ShowSchedule> {
    List<ShowScheduleDTO> findAllShowScheduleDTO();

    List<ShowScheduleDetailsDTO> findAllShowScheduleDetailsDTOByBranchId(Long id);

    Optional<ShowScheduleDTO> findShowScheduleDTOById(Long id);

    ShowSchedule setInfoShowSchedule(ShowSchedule showSchedule, ShowScheduleDTO showScheduleDTO);

    BindingResult checkValidShowSchedule(BindingResult bindingResult, ShowScheduleDTO showScheduleDTO);

    void deleteShowScheduleById(Long id);

    Set<Branch> findAllBranchByMovie(String id);

    Set<Room> findAllRoomByMovieAndBranch(String movieId, Long branchId);

    Set<String> findAllShowDateByMovieAndBranch(String movieId, Long branchId);

    Set<String> findAllShowDateByMovieAndRoom(String movieId, Long roomId);

    List<ShowSchedule> findAllShowTimeSlot(String movieId, Long branchId, String showDate);

    List<ShowSchedule> findAllShowTimeSlotByRoomAndShowDate(Long id, String showDate);

    Set<String> findShowTimeSlotsByMovieAndRoomAndShowDate(String movieId, Long roomId, String showDate);




    List<ShowScheduleDTO> findAllShowScheduleDTOByMovie(String id);

    boolean existsShowScheduleByRoomAndShowDate(Room room , String showDate);

    List<ShowScheduleDTO> search(String searchInput);

    int getMinute(String showTimeSlot);
}

package com.cg;



import com.cg.dto.ShowScheduleDTO;
import com.cg.dto.ShowScheduleDetailsDTO;
import com.cg.entity.Branch;
import com.cg.entity.Room;
import com.cg.entity.ShowSchedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ShowScheduleRepository extends JpaRepository<ShowSchedule, Long> {
    @Query("SELECT NEW com.cg.dto.ShowScheduleDTO (" +
            "s.id," +
            "s.movie.id," +
            "s.movie.title," +
            "s.room.id," +
            "s.room.name," +
            "s.branch.id," +
            "s.branch.name," +
            "s.showDate," +
            "s.showTimeSlot" +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.deleted = false " +
            "ORDER BY s.id")
    List<ShowScheduleDTO> findAllShowScheduleDTO();

    @Query("SELECT NEW com.cg.dto.ShowScheduleDTO (" +
            "s.id," +
            "s.movie.id," +
            "s.movie.title," +
            "s.room.id," +
            "s.room.name," +
            "s.branch.id," +
            "s.branch.name," +
            "s.showDate," +
            "s.showTimeSlot" +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.id = :id " +
            "AND s.deleted = false")
    Optional<ShowScheduleDTO> findShowScheduleDTOById(@Param("id") Long id);

    @Modifying
    @Query("UPDATE ShowSchedule AS s SET s.deleted = 1 WHERE s.id= :id")
    void deleteShowScheduleById(@Param("id") Long id);

    @Query("SELECT s.branch FROM ShowSchedule  AS s WHERE s.movie.id = :id AND s.deleted = false")
    Set<Branch> findAllBranchByMovie(@Param("id") String id);

    @Query("SELECT s.showDate FROM ShowSchedule AS s WHERE s.movie.id = :movieId AND s.branch.id = :branchId AND s.deleted = false")
    Set<String> findAllShowDateByMovieAndBranch(String movieId, Long branchId);

    @Query("SELECT NEW com.cg.entity.ShowSchedule(" +
            "s.showTimeSlot, " +
            "s.room )" +
            "FROM ShowSchedule AS s " +
            "WHERE s.movie.id = :movieId " +
            "AND s.branch.id = :branchId " +
            "AND s.showDate = :showDate " +
            "AND s.deleted = false")
    List<ShowSchedule> findAllShowTimeSlot(String movieId, Long branchId, String showDate);

    @Query("SELECT NEW com.cg.entity.ShowSchedule(" +
            "s.showTimeSlot," +
            "s.movie )" +
            "FROM ShowSchedule AS s " +
            "WHERE s.room.id = :id " +
            "AND s.showDate = :showDate " +
            "AND s.deleted = false " +
            "ORDER BY s.showTimeSlot")
    List<ShowSchedule> findAllShowTimeSlotByRoomAndShowDate(Long id, String showDate);

    @Query("SELECT NEW com.cg.dto.ShowScheduleDTO(" +
            "s.id," +
            "s.movie.id," +
            "s.movie.title," +
            "s.room.id," +
            "s.room.name," +
            "s.branch.id," +
            "s.branch.name," +
            "s.showDate," +
            "s.showTimeSlot" +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.movie.id = :id " +
            "AND s.deleted = false")
    List<ShowScheduleDTO> findAllShowScheduleDTOByMovie(@Param("id") String id);


    @Query("SELECT " +
            "s.room " +
            "FROM ShowSchedule AS s " +
            "WHERE s.movie.id = :movieId " +
            "AND s.branch.id = :branchId " +
            "AND s.deleted = false ")
    Set<Room> findAllRoomByMovieAndBranch(String movieId, Long branchId);


    @Query("SELECT " +
            "s.showDate " +
            "FROM ShowSchedule AS s " +
            "WHERE s.movie.id = :movieId " +
            "AND s.room.id = :roomId " +
            "AND s.deleted = false")
    Set<String> findAllShowDateByMovieAndRoom(String movieId, Long roomId);

    @Query("SELECT " +
            "s.showTimeSlot " +
            "FROM ShowSchedule AS s " +
            "WHERE s.movie.id = :movieId " +
            "AND s.room.id = :roomId " +
            "AND s.showDate = :showDate " +
            "AND s.deleted = false ")
    Set<String> findShowTimeSlotsByMovieAndRoomAndShowDate(String movieId, Long roomId, String showDate);

    boolean existsShowScheduleByRoomAndShowDate(Room room , String showDate);


    @Query("SELECT NEW com.cg.dto.ShowScheduleDTO (" +
            "s.id," +
            "s.movie.id," +
            "s.movie.title," +
            "s.room.id," +
            "s.room.name," +
            "s.branch.id," +
            "s.branch.name," +
            "s.showDate," +
            "s.showTimeSlot" +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.deleted = false " +
            "ORDER BY s.id")
    Page<ShowScheduleDTO> findAllShowScheduleDTOPaging(Pageable pageable);

    @Query("select count (s.id) from ShowSchedule as s where s.deleted = false ")
    Integer getDataLength();
    @Query("SELECT NEW com.cg.dto.ShowScheduleDetailsDTO (" +
            "s.id, " +
            "s.movie, " +
            "s.room.id, " +
            "s.room.name, " +
            "s.branch.id, " +
            "s.branch.name, " +
            "s.branch.address, " +
            "s.showDate, " +
            "s.showTimeSlot " +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.deleted = false " +
            "AND s.branch.id = :branchId " +
            "GROUP BY s.movie "

    )
    List<ShowScheduleDetailsDTO> findAllShowScheduleDetailsDTOByBranchId(Long branchId);


    @Query("SELECT NEW com.cg.dto.ShowScheduleDetailsDTO (" +
            "s.id, " +
            "s.movie, " +
            "s.showDate " +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.deleted = false " +
            "AND s.branch.id = :branchId " +
            "AND s.movie.id = :movieId " +
            "GROUP BY s.movie, s.showDate "

    )
    List<ShowScheduleDetailsDTO> findByBranchAndMovieGroupByMovieAndShowDate(Long branchId, String movieId);


    @Query("SELECT NEW com.cg.dto.ShowScheduleDetailsDTO (" +
            "s.id, " +
            "s.movie, " +
            "s.room.id, " +
            "s.showDate, " +
            "s.showTimeSlot " +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.deleted = false " +
            "AND s.branch.id = :branchId " +
            "AND s.movie.id = :movieId " +
            "AND s.showDate = :showDate " +
            "GROUP BY s.movie, s.showDate, s.showTimeSlot "

    )
    List<ShowScheduleDetailsDTO> findSCGroupByMovieAndShowDateAndShowTimeSlot(Long branchId, String movieId, String showDate);

    @Query("SELECT NEW com.cg.dto.ShowScheduleDetailsDTO (" +
            "s.id, " +
            "s.movie, " +
            "s.room.id, " +
            "s.showDate, " +
            "s.showTimeSlot " +
            ") " +
            "FROM ShowSchedule AS s " +
            "WHERE s.deleted = false " +
            "AND s.room.id = :roomId " +
            "AND s.showDate = :showDate " +
            "ORDER BY s.showTimeSlot"

    )
    List<ShowScheduleDetailsDTO> findALlScheduleByRoomAndShowDate(Long roomId, String showDate);
}

package com.cg.cinestar.model.dto;

import com.cg.cinestar.model.Movie;
import com.cg.cinestar.model.ShowSchedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class ShowScheduleDetailsDTO {
    private Long id;

    private MovieDTO movie;

    private String roomId;

    private String roomName;

    private String branchId;

    private String branchName;

    private String branchAddress;


    @NotBlank(message = "Ngày chiếu không được để trống!")
    private String showDate;


    @NotBlank(message = "Khung giờ chiếu không được để trống!")
    private String showTimeSlot;

    public ShowSchedule toShowSchedule() {
        return new ShowSchedule()
                .setShowDate(showDate)
                .setShowTimeSlot(showTimeSlot);
    }

    public ShowScheduleDetailsDTO(Long id, Movie movie, Long roomId, String roomName, Long branchId, String branchName, String branchAddress, String showDate, String showTimeSlot) {
        this.id = id;
        this.movie = movie.toMovieDTO();
        this.roomId = roomId.toString();
        this.roomName = roomName;
        this.branchId = branchId.toString();
        this.branchName = branchName;
        this.branchAddress = branchAddress;
        this.showDate = showDate;
        this.showTimeSlot = showTimeSlot;
    }

    public ShowScheduleDetailsDTO(Long id, Movie movie, String showDate) {
        this.id = id;
        this.movie = movie.toMovieDTO();
        this.showDate = showDate;
    }

    public ShowScheduleDetailsDTO(Long id, Movie movie,Long roomId, String showDate, String showTimeSlot) {
        this.id = id;
        this.movie = movie.toMovieDTO();
        this.roomId = roomId.toString();
        this.showDate = showDate;
        this.showTimeSlot = showTimeSlot;
    }
}

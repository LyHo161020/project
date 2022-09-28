package com.cg.dto;

import com.cg.StringUtils;
import com.cg.entity.ShowSchedule;
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

public class ShowScheduleDTO {

    private Long id;

    private String movieId;

    private String movieName;

    private String roomId;

    private String roomName;

    private String branchId;

    private String branchName;


    @NotBlank(message = "Ngày chiếu không được để trống!")
    private String showDate;


    @NotBlank(message = "Khung giờ chiếu không được để trống!")
    private String showTimeSlot;

    public ShowSchedule toShowSchedule() {
        return new ShowSchedule()
                .setShowDate(showDate)
                .setShowTimeSlot(showTimeSlot);
    }

    public ShowScheduleDTO(Long id, String movieId, String movieName, Long roomId, String roomName, Long branchId, String branchName, String showDate, String showTimeSlot) {
        this.id = id;
        this.movieId = movieId;
        this.movieName = movieName;
        this.roomId = String.valueOf(roomId);
        this.roomName = roomName;
        this.branchId = String.valueOf(branchId);
        this.branchName = branchName;
        this.showDate = showDate;
        this.showTimeSlot = showTimeSlot;
    }



    @Override
    public String toString() {
        String str = id + " " + movieId + " " + movieName + " " + branchId + " " + branchName + " " + roomId + " " + roomName + " " + showDate + " " + showTimeSlot;

        return StringUtils.removeAccent(str.toLowerCase());
    }
}

package com.cg.cinestar.model;

import com.cg.cinestar.model.dto.ShowScheduleDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "show_schedules")
@Accessors(chain = true)

public class ShowSchedule extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String showTimeSlot;

    private String showDate;

    public ShowSchedule(String showTimeSlot, Movie movie) {
        this.showTimeSlot = showTimeSlot;
        this.movie = movie;
    }

    public ShowSchedule(String showTimeSlot, Room room) {
        this.showTimeSlot = showTimeSlot;
        this.room = room;
    }

    @OneToOne(targetEntity = Movie.class, fetch = FetchType.EAGER)
    private Movie movie;

    @OneToOne(targetEntity = Branch.class, fetch = FetchType.EAGER)
    private Branch branch;

    @OneToOne(targetEntity = Room.class, fetch = FetchType.EAGER)
    private Room room;

    public ShowScheduleDTO toShowScheduleDTO() {
        return new ShowScheduleDTO()
                .setId(id)
                .setShowTimeSlot(showTimeSlot)
                .setShowDate(showDate)
                .setMovieId(movie.getId())
                .setMovieName(movie.getTitle())
                .setRoomId(String.valueOf(room.getId()))
                .setRoomName(room.getName())
                .setBranchId(String.valueOf(branch.getId()))
                .setBranchName(branch.getName());
    }
}


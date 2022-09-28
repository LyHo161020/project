package com.cg.cinestar.repository;

import com.cg.cinestar.model.Room;
import com.cg.cinestar.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findAllByRoom(Room room);
}

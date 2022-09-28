package com.cg;

import com.cg.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room AS r WHERE r.branch.id = :id")
    List<Room> findAllRoomByBranchId(@Param("id") Long id);
}

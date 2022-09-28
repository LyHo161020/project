package com.cg.cinestar.controller.api;


import com.cg.cinestar.model.Branch;
import com.cg.cinestar.model.Room;
import com.cg.cinestar.model.dto.RoomDTO;
import com.cg.cinestar.service.branch.IBranchService;
import com.cg.cinestar.service.room.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomAPI {
    @Autowired
    private IRoomService roomService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findAllRoomByBranchId(@PathVariable Long id) {
        List<RoomDTO> rooms = roomService.findAllRoomByBranchId(id);

        if(rooms.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }
}

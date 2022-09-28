package com.cg;


import com.cg.entity.Room;
import com.cg.entity.Seat;
import com.cg.room.IRoomService;
import com.cg.seat.ISeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seats")
public class SeatAPI {
    @Autowired
    private ISeatService seatService;

    @Autowired
    private IRoomService roomService;

    @Autowired
    private SeatRepository seatRepository;

    @GetMapping("/{roomId}")
    public ResponseEntity<?>  findSeatsByRoom(@PathVariable Long roomId) {
        Optional<Room>  room = roomService.findById(roomId);

        if(!room.isPresent()) {
            return new ResponseEntity<>("Phong khong ton tai", HttpStatus.BAD_REQUEST);
        }

        List<Seat> seatDTOList = seatRepository.findAllByRoom(room.get());

        if(seatDTOList.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(seatDTOList,HttpStatus.OK);

    }
}

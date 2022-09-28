package com.cg;

import com.cg.entity.SeatType;
import com.cg.seat_type.ISeatTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/seat_types")
public class SeatTypeAPI {
    @Autowired
    private ISeatTypeService seatTypeService;

    @GetMapping
    public ResponseEntity<?> findAllSeatType() {
        List<SeatType> seatTypeList = seatTypeService.findAll();

        if(seatTypeList.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(seatTypeList, HttpStatus.OK);
    }
}

package com.cg.seat;


import com.cg.SeatRepository;
import com.cg.entity.Room;
import com.cg.entity.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class SeatServiceImpl implements ISeatService{
    @Autowired
    private SeatRepository seatRepository;
    @Override
    public List<Seat> findAll() {
        return seatRepository.findAll();
    }

    @Override
    public Optional<Seat> findById(Long id) {
        return seatRepository.findById(id);
    }

    @Override
    public Seat getById(Long id) {
        return null;
    }

    @Override
    public Seat save(Seat seat) {
        return seatRepository.save(seat);
    }

    @Override
    public void remove(Long id) {
        seatRepository.deleteById(id);
    }

    @Override
    public void create(Room room) {

    }
}

package com.cg.cinestar.service.seat;

import com.cg.cinestar.model.Room;
import com.cg.cinestar.model.Seat;
import com.cg.cinestar.service.IGeneralService;

public interface ISeatService extends IGeneralService<Seat> {
    void create(Room room);
}

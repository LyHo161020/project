package com.cg.seat;

import com.cg.IGeneralService;
import com.cg.entity.Room;
import com.cg.entity.Seat;

public interface ISeatService extends IGeneralService<Seat> {
    void create(Room room);
}

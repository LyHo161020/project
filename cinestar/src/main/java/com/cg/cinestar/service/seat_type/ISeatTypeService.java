package com.cg.cinestar.service.seat_type;

import com.cg.cinestar.model.SeatType;
import com.cg.cinestar.service.IGeneralService;

public interface ISeatTypeService extends IGeneralService<SeatType> {
    void createSeat();
}


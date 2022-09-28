package com.cg.cinestar.service.room;

import com.cg.cinestar.model.Room;
import com.cg.cinestar.model.dto.RoomDTO;
import com.cg.cinestar.service.IGeneralService;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IRoomService extends IGeneralService<Room> {
    List<RoomDTO> findAllRoomByBranchId(Long id);

    boolean checkValidRoomId(String id);

}

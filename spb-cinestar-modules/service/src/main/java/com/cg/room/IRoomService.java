package com.cg.room;

import com.cg.IGeneralService;
import com.cg.dto.RoomDTO;
import com.cg.entity.Room;

import java.util.List;

public interface IRoomService extends IGeneralService<Room> {
    List<RoomDTO> findAllRoomByBranchId(Long id);

    boolean checkValidRoomId(String id);

}

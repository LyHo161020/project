package com.cg.mapper;



import com.cg.dto.RoomDTO;
import com.cg.entity.Room;
import org.springframework.stereotype.Component;

@Component
public class RoomMapper {

    public RoomDTO toRoomDTO(Room room){
        return new RoomDTO()
                .setId(room.getId())
                .setName(room.getName());
    }

}

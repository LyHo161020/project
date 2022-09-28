package com.cg.cinestar.mapper;


import com.cg.cinestar.model.Room;
import com.cg.cinestar.model.dto.RoomDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.stereotype.Component;

@Component
public class RoomMapper {

    public RoomDTO toRoomDTO(Room room){
        return new RoomDTO()
                .setId(room.getId())
                .setName(room.getName());
    }

}

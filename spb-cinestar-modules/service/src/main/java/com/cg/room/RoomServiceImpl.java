package com.cg.room;

import com.cg.RoomRepository;
import com.cg.ValidDateUtils;
import com.cg.dto.RoomDTO;
import com.cg.entity.Room;
import com.cg.mapper.RoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class RoomServiceImpl implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomMapper roomMapper;

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Optional<Room> findById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public Room getById(Long id) {
        return null;
    }

    @Override
    public Room save(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public void remove(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public List<RoomDTO> findAllRoomByBranchId(Long id) {
        List<RoomDTO> roomDTOS = new ArrayList<>();

        roomRepository.findAllRoomByBranchId(id).forEach(room -> roomDTOS.add(roomMapper.toRoomDTO(room)));

        return roomDTOS;

//        Cach 2:
//        return roomRepository.findAllRoomByBranchId(id)
//                .stream().map(room -> roomMapper.toRoomDTO(room))
//                .collect(Collectors.toList());

    }

    @Override
    public boolean checkValidRoomId(String idStr) {
        if(!ValidDateUtils.isNumberValid(idStr)){
            return true;
        }else {
            List<Room> rooms = findAll();
            Long id = Long.parseLong(idStr);

            for (Room room : rooms) {
                if(room.getId().equals(id)) {
                    return false;
                }
            }
            return true;
        }

    }
}

package com.cg.cinestar.service.seat_type;

import com.cg.cinestar.model.Room;
import com.cg.cinestar.model.Seat;
import com.cg.cinestar.model.SeatType;
import com.cg.cinestar.repository.SeatRepository;
import com.cg.cinestar.repository.SeatTypeRepository;
import com.cg.cinestar.service.room.IRoomService;
import com.cg.cinestar.service.room.RoomServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class SeatTypeServiceImpl implements ISeatTypeService{

    @Autowired
    private SeatTypeRepository seatTypeRepository;
    @Autowired
    private IRoomService roomService;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public List<SeatType> findAll() {
        return seatTypeRepository.findAll();
    }

    @Override
    public Optional<SeatType> findById(Long id) {
        return seatTypeRepository.findById(id);
    }

    @Override
    public SeatType getById(Long id) {
        return null;
    }

    @Override
    public SeatType save(SeatType seatType) {
        return seatTypeRepository.save(seatType);
    }

    @Override
    public void remove(Long id) {
        seatTypeRepository.deleteById(id);
    }


    @Override
    public void createSeat() {
//        IRoomService roomService = new RoomServiceImpl();
        List<Room>  rooms = roomService.findAll();
        Seat seat = new Seat();
        String[] strArr = {"A0","B0","C0", "D0", "E0","F0","G0","H0","I0","J0","K0","L0"};
        String[] strArr1 = {"A","B","C", "D", "E","F","G","H","I","J","K","L"};


        for(Room room : rooms) {
            double size = Double.parseDouble(String.valueOf(room.getCapacity()));
//            System.out.println(95 / 10);
//            int count = 0;

            for(int j = 0; j < Math.ceil(Double.parseDouble(String.valueOf(room.getCapacity())) / 10); j++) {
                System.out.println(Math.ceil(Double.parseDouble(String.valueOf(room.getCapacity())) / 10));
                double row = (size > 10) ? 10 : size;
                System.out.println(row);


                for(int i = 0; i < row; i++) {
                    String name;
                    if(i == 9) {
                        name = strArr1[j] + (i + 1);
                    } else {
                       name = strArr[j] + (i + 1);
                    }

                        seat.setId(0L);
                        seat.setName(name);
                        seat.setRoom(room);
                        seat.setSeatType(new SeatType(1L,"GHẾ ĐƠN", 45000L));
                    System.out.println(seat);
                    seatRepository.save(seat);
//                    count++;
                }
                size -= 10;
            }

        }
    }

    public static void main(String[] args) {
        double t = 96;
        System.out.println(t / 10);
    }

}

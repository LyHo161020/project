package com.cg.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;




@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "seats")
@Accessors(chain = true)
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;

    @OneToOne(targetEntity = SeatType.class, fetch = FetchType.EAGER)
    private SeatType seatType;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}

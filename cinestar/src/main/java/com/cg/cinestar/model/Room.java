package com.cg.cinestar.model;


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
@Table(name = "rooms")
@Accessors(chain = true)
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Long id;

    private String name;

    private Long capacity;

    @Column(name = "number_of_rows")
    private Long numberOfRows;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", capacity=" + capacity +
                ", numberOfRows=" + numberOfRows +
                ", branch=" + branch +
                '}';
    }
}

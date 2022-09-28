package com.cg.cinestar.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "branches")
@Accessors(chain = true)

public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JoinColumn(name = "branch_id",referencedColumnName = "id")
    private Long id;

    private String name;

    private String address;

//    @OneToMany(targetEntity = Room.class, fetch = FetchType.EAGER)
//    private Set<Room> rooms;
}

package com.cg.entity;

import com.cg.dto.FoodDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "foods")
@Accessors(chain = true)
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;

    private Long price;

    @ManyToMany(targetEntity = Size.class,fetch = FetchType.EAGER)
    private List<Size> size;

    private boolean deleted;



    public FoodDTO toFoodDTO() {
        return new FoodDTO()
                .setId(id)
                .setName(name)
                .setPrice(String.valueOf(price))
                .setSize(size)
                .setDeleted(deleted);
    }

}

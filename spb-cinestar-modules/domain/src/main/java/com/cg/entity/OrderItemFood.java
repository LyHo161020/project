package com.cg.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_item_food")
@Accessors(chain = true)
public class OrderItemFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "food_id")
    private Food food;


    private Long quantity;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;


}

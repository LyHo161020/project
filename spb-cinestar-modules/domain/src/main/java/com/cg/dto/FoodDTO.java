package com.cg.dto;

import com.cg.ValidDateUtils;
import com.cg.entity.Food;
import com.cg.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class FoodDTO implements Validator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @NotBlank(message = "Food name is not blank!")
    @javax.validation.constraints.Size(min = 2, max = 100, message = "Length of food name in between 2 to 100!")
    private String name;

    private String price;

    private List<Size> size;

    private boolean deleted;

    public FoodDTO(Long id, String name, Long price, boolean deleted) {
        this.id = id;
        this.name = name;
        this.price = String.valueOf(price);
        this.deleted = deleted;
    }

    public Food toFood() {
        return new Food()
//                .setId(id)
                .setName(name)
                .setPrice(new Long(price))
                .setSize(size)
                .setDeleted(deleted);
    }

    @Override
    public String toString() {
        return name + " " + price + " " + size;
    }


    @Override
    public boolean supports(Class<?> aClass) {
        return Food.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        FoodDTO foodDTO = (FoodDTO) o;
        String price = foodDTO.getPrice();


        if (!ValidDateUtils.isNumberValid(String.valueOf(price))) {

            if (price == null || price.equals("")) {
                errors.rejectValue("price", "400", "Price is not blank!");
            } else {
                errors.rejectValue("price", "400", "Invalid price!");
            }

        } else {
            if (price.length() > 7) {
                errors.rejectValue("price", "400", "Maximum of food price is {1.000.000} $!");
            } else {

                long validPrice = Long.parseLong(price);
                if (validPrice < 0) {
                    errors.rejectValue("price", "400", "Food price cannot be a negative number!");
                }

                if (validPrice > 1000000) {
                    errors.rejectValue("price", "400", "Maximum of food price is {1.000.000} $!");
                }
            }
        }
    }
}


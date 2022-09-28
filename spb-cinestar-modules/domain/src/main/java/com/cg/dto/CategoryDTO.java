package com.cg.dto;


import com.cg.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CategoryDTO {

    private Long id;
    private String name;

    public Category toCategory() {
        return new Category()
                .setId(id)
                .setName(name);
    }

}

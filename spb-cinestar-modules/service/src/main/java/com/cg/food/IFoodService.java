package com.cg.food;

import com.cg.IGeneralService;
import com.cg.dto.FoodDTO;
import com.cg.entity.Food;

import java.util.List;
import java.util.Optional;

public interface IFoodService extends IGeneralService<Food> {
    List<FoodDTO> findAllFoodDTO();
    Optional<FoodDTO> findFoodDTOByID(Long id);

    List<FoodDTO> search(String searchInput);
}

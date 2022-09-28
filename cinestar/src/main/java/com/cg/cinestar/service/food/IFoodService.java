package com.cg.cinestar.service.food;

import com.cg.cinestar.model.Food;
import com.cg.cinestar.model.dto.FoodDTO;
import com.cg.cinestar.service.IGeneralService;

import java.util.List;
import java.util.Optional;

public interface IFoodService extends IGeneralService<Food> {
    List<FoodDTO> findAllFoodDTO();
    Optional<FoodDTO> findFoodDTOByID(Long id);

    List<FoodDTO> search(String searchInput);
}

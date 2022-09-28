package com.cg.food;


import com.cg.FoodRepository;
import com.cg.dto.FoodDTO;
import com.cg.entity.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FoodServiceImpl implements IFoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public List<Food> findAll() {
        return foodRepository.findAll();
    }

    @Override
    public Optional<Food> findById(Long id) {
        return foodRepository.findById(id);
    }

    @Override
    public Food getById(Long id) {
        return null;
    }

    @Override
    public Food save(Food o) {
        return foodRepository.save(o);
    }


    @Override
    public void remove(Long id) {
        foodRepository.removeFood(id);
    }

    @Override
    public List<FoodDTO> findAllFoodDTO() {
        return foodRepository.findAllFoodDTO();
    }

    @Override
    public Optional<FoodDTO> findFoodDTOByID(Long id) {
        return foodRepository.findFoodDTOByID(id);
    }

    @Override
    public List<FoodDTO> search(String searchInput) {
        List<FoodDTO> foodDTOs = findAllFoodDTO();
        List<FoodDTO> listSearch = new ArrayList<>();

        for(FoodDTO foodDTO : foodDTOs){
            if(foodDTO.toString().toLowerCase().contains(searchInput)){
                listSearch.add(foodDTO);
            }
        }

        return listSearch;
    }
}

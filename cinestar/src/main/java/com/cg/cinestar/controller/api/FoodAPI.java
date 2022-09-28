package com.cg.cinestar.controller.api;


import com.cg.cinestar.model.Food;
import com.cg.cinestar.model.Size;
import com.cg.cinestar.model.dto.FoodDTO;
import com.cg.cinestar.service.food.IFoodService;
import com.cg.cinestar.service.size.ISizeService;
import com.cg.cinestar.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/foods")
public class FoodAPI {

    @Autowired
    private IFoodService foodService;

    @Autowired
    private ISizeService sizeService;

    @GetMapping
    public ResponseEntity<?> showListFood() {
        List<FoodDTO> foodDTOs = foodService.findAllFoodDTO();

        if(foodDTOs.isEmpty()) {
            return new ResponseEntity<>("List is empty!", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(foodDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<FoodDTO> foodDTOs = foodService.findFoodDTOByID(id);

        if (!foodDTOs.isPresent()) {
            return new ResponseEntity<>("Food ID :" + id + "not found" + "!", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(foodDTOs.get(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> doAdd(@Validated @RequestBody FoodDTO foodDTO, BindingResult bindingResult) {

        new FoodDTO().validate(foodDTO, bindingResult);

        List<Size> sizes = sizeService.findAll();


        if (bindingResult.hasErrors()) {
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        Food food = foodDTO.toFood();
        food.setId(0L);
        food.setSize(sizes);

        try {
            food = foodService.save(food);

            return new ResponseEntity<>(food.toFoodDTO(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> doEdit(@PathVariable Long id,@Validated @RequestBody FoodDTO foodDTO,
                                      BindingResult bindingResult) {
        Optional<Food> f = foodService.findById(id);

        List<Size> sizes = sizeService.findAll();
        if (!f.isPresent()) {
            return new ResponseEntity<>("This food is not found!", HttpStatus.NOT_FOUND);
        }

        new FoodDTO().validate(foodDTO,bindingResult);

        if (bindingResult.hasErrors()) {
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        try {
            Food food = foodDTO.toFood();

            food.setId(f.get().getId());
//            food.setDeleted(f.get().isDeleted());
            food.setSize(sizes);

            foodDTO = food.toFoodDTO();

            foodService.save(food);

            return new ResponseEntity<>(foodDTO, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Server error!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> doRemoveFood(@PathVariable Long id){

        Optional<FoodDTO> foodDTO = foodService.findFoodDTOByID(id);



        if (!foodDTO.isPresent()) {
            return new ResponseEntity<>("The account ID:" + id + " is not found!", HttpStatus.NO_CONTENT);
        }

        Food food = foodDTO.get().toFood();


        try{
            if(!food.isDeleted()) {
                foodService.remove(id);
            }

            food = foodService.findById(id).get();


            return new ResponseEntity<>(food.getId(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Server error!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody String searchInput) {
        searchInput = searchInput.replace('"',' ').trim().toLowerCase();
        List<FoodDTO> listSearch = foodService.search(searchInput);

        if(listSearch.size() == 0) {
            return new ResponseEntity<>("List is empty!!", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listSearch,HttpStatus.OK);
    }
}

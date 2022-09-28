package com.cg;


import com.cg.dto.FoodDTO;
import com.cg.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {


    @Query("SELECT NEW com.cg.dto.FoodDTO (" +
            "f.id, " +
            "f.name, " +
            "f.price, " +
            "f.deleted " +
            ") " +
            "FROM Food AS f WHERE f.deleted = false " +
            "ORDER BY f.id"

    )
    List<FoodDTO> findAllFoodDTO();





    @Query ("SELECT NEW com.cg.dto.FoodDTO (" +
            "f.id, " +
            "f.name, " +
            "f.price, " +
            "f.deleted " +
            ") " +
            "FROM Food AS f " +
            "WHERE f.id = :id"
    )
    Optional<FoodDTO> findFoodDTOByID(@Param("id") long id);

    @Modifying
    @Query("UPDATE Food AS f SET f.deleted = 1 WHERE f.id = :id")
    void removeFood(@Param("id") Long id);

}

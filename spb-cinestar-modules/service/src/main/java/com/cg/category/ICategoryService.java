package com.cg.category;


import com.cg.IGeneralService;
import com.cg.entity.Category;

import java.util.List;


public interface ICategoryService extends IGeneralService<Category> {
    List<Category> findAllCategoriesByFilmId(String id);
}

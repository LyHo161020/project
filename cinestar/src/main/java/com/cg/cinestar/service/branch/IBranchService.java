package com.cg.cinestar.service.branch;

import com.cg.cinestar.model.Branch;
import com.cg.cinestar.service.IGeneralService;

public interface IBranchService extends IGeneralService<Branch> {
    boolean checkValidBranchId(String idStr);
}

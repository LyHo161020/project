package com.cg.branch;


import com.cg.IGeneralService;
import com.cg.entity.Branch;

public interface IBranchService extends IGeneralService<Branch> {
    boolean checkValidBranchId(String idStr);
}

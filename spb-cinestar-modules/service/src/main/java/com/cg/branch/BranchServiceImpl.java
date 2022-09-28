package com.cg.branch;


import com.cg.BranchRepository;
import com.cg.ValidDateUtils;


import com.cg.entity.Branch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class BranchServiceImpl implements IBranchService {
    @Autowired
    private BranchRepository branchRepository;

    @Override
    public List<Branch> findAll() {
        return branchRepository.findAll();
    }

    @Override
    public Optional<Branch> findById(Long id) {
        return branchRepository.findById(id);
    }

    @Override
    public Branch getById(Long id) {
        return null;
    }

    @Override
    public Branch save(Branch branch) {
        return branchRepository.save(branch);
    }

    @Override
    public void remove(Long id) {
        branchRepository.deleteById(id);
    }

    @Override
    public boolean checkValidBranchId(String idStr) {
        if(!ValidDateUtils.isNumberValid(idStr)){
            return true;
        }else {
            List<Branch> branches = findAll();
            Long id = Long.parseLong(idStr);

            for (Branch branch : branches) {
                if(branch.getId().equals(id)) {
                    return false;
                }
            }
            return true;
        }

    }
}

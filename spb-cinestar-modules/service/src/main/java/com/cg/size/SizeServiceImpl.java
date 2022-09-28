package com.cg.size;


import com.cg.SizeRepository;
import com.cg.entity.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SizeServiceImpl implements ISizeService {

    @Autowired
    private SizeRepository sizeRepository;
    @Override
    public List<Size> findAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Optional<Size> findById(Long id) {
        return sizeRepository.findById(id);
    }

    @Override
    public Size getById(Long id) {
        return null;
    }

    @Override
    public Size save(Size size) {
        return sizeRepository.save(size);
    }

    @Override
    public void remove(Long id) {
        sizeRepository.deleteById(id);
    }
}

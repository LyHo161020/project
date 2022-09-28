package com.cg.cinestar.repository;


import com.cg.cinestar.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
}

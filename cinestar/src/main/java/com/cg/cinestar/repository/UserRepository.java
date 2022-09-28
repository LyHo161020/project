package com.cg.cinestar.repository;

import com.cg.cinestar.model.User;
import com.cg.cinestar.model.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User getByUsername(String username);

    Optional<User> findByUsername(String username);
    @Modifying
    @Query("UPDATE User AS u SET u.status.id = 2 WHERE u.id = :id")
    void blockUser(@Param("id") Long id);

    @Modifying
    @Query("UPDATE User AS u SET u.status.id = 1 WHERE u.id = :id")
    void unlockUser(@Param("id") Long id);


    @Query ("SELECT NEW com.cg.cinestar.model.dto.UserDTO (" +
            "u.id, " +
            "u.username," +
            "u.fullName, " +
            "u.phone, " +
            "u.email, " +
            "u.address, " +
            "u.dateOfBirth, " +
            "u.status, " +
            "u.role " +
            ") " +
            "FROM User u " +
            "WHERE u.deleted = false " +
            "ORDER BY u.id"
    )
    List<UserDTO> findAllUserDTO();


    Optional<User> findById(long id);


    @Query("SELECT NEW com.cg.cinestar.model.dto.UserDTO (" +
            "u.id, " +
            "u.username," +
            "u.fullName, " +
            "u.phone, " +
            "u.email, " +
            "u.address, " +
            "u.dateOfBirth, " +
            "u.status, " +
            "u.role " +
            ") " +
            "FROM User AS u " +
            "WHERE u.username = ?1")
    Optional<UserDTO> findUserDTOByUsername(String username);
}

package com.cg.mapper;

import com.cg.dto.UserDTO;
import com.cg.dto.UserDTOCreate;
import com.cg.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO toUserDTO(User user){
        return new UserDTO()
                .setId(user.getId())
                .setUsername(user.getUsername())
                .setEmail(user.getEmail())
                .setFullName(user.getFullName())
                .setPhone(user.getPhone())
                .setDateOfBirth(user.getDateOfBirth())
                .setAddress(user.getAddress())
                .setStatus(user.getStatus())
                .setRole(user.getRole());
    }

    public UserDTOCreate toUserDTOCreate(User user){
        return new UserDTOCreate()
                .setId(user.getId())
                .setUsername(user.getUsername())
                .setEmail(user.getEmail())
                .setFullName(user.getFullName())
                .setPhone(user.getPhone())
                .setDateOfBirth(user.getDateOfBirth())
                .setAddress(user.getAddress())
                .setStatus(user.getStatus())
                .setRole(user.getRole());
    }
}

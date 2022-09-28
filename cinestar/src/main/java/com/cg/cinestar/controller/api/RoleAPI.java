package com.cg.cinestar.controller.api;


import com.cg.cinestar.model.Role;
import com.cg.cinestar.service.role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleAPI {
    @Autowired
    private IRoleService roleService;
    @GetMapping
    public ResponseEntity<?> findAllRole() {
        List<Role> roles = roleService.findAll();

        if(roles.isEmpty()) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
}

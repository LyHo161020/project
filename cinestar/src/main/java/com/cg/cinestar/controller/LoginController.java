package com.cg.cinestar.controller;


import com.cg.cinestar.service.jwt.JwtService;
import com.cg.cinestar.model.dto.UserDTO;
import com.cg.cinestar.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
public class LoginController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private IUserService userService;

    @GetMapping("/{id}")
    public ModelAndView getLoginPage() {
        return new ModelAndView("/error/error");
    }

    @GetMapping()
    public ModelAndView showHome(@CookieValue(value = "JWT" , defaultValue = "hello") String fooCookie) {ModelAndView modelAndView = new ModelAndView("/login");
        String username = jwtService.getUserNameFromJwtToken(fooCookie);
        Optional<UserDTO> userDTO = userService.findUserDTOByUsername(username);

        if(userDTO.get().getRole().getId() == 2) {
            modelAndView = new ModelAndView("/homeStaff");
            modelAndView.addObject("user",userDTO.get());
        }else if (userDTO.get().getRole().getId() == 3) {
            modelAndView = new ModelAndView("/homeAdmin");
            modelAndView.addObject("user",userDTO.get());
        }
        return modelAndView;
    }

    @GetMapping("/login")
    public ModelAndView getLogin() {
        return new ModelAndView("/login");
    }
}

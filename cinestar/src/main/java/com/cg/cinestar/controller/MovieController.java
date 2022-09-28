package com.cg.cinestar.controller;

import com.cg.cinestar.model.dto.UserDTO;
import com.cg.cinestar.service.jwt.JwtService;
import com.cg.cinestar.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private IUserService userService;

    @GetMapping
    public ModelAndView getHome(@CookieValue(value = "JWT", defaultValue = "hello") String fooCookie) {
        ModelAndView modelAndView = new ModelAndView();
        String username = jwtService.getUserNameFromJwtToken(fooCookie);
        Optional<UserDTO> userDTO = userService.findUserDTOByUsername(username);

        if (userDTO.get().getRole().getId() == 1 || userDTO.get().getRole().getId() == 2) {
            modelAndView = new ModelAndView("/error/error");
        } else if (userDTO.get().getRole().getId() == 3) {
            modelAndView = new ModelAndView("/movie/list_movie");
            modelAndView.addObject("user", userDTO.get());
        }
        return modelAndView;
    }

    @GetMapping("/{id}")
    public ModelAndView getDescription() {
        return new ModelAndView("/customer/movie_description");
    }
}

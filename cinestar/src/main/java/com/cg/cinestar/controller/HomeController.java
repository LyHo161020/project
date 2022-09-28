package com.cg.cinestar.controller;

import com.cg.cinestar.model.dto.UserDTO;
import com.cg.cinestar.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;


@Controller
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private IUserService userService;

//    @GetMapping("/user{id}")
//    public ModelAndView showDashboardUser(@PathVariable("id") Long id) {
//        ModelAndView modelAndView = new ModelAndView("/home");
//        Optional<UserDTO> userDTO = userService.findUserDTOByID(id);
//        modelAndView.addObject("user", userDTO.get());
//        return modelAndView;
//    }

    @GetMapping("/staff/{id}")
    public ModelAndView showDashboardUser(@PathVariable("id") Long id) {
        ModelAndView modelAndView = new ModelAndView("/homeStaff");
        UserDTO userDTO = userService.findUserDTOByID(id);
        modelAndView.addObject("user",userDTO);
        return modelAndView;
    }

    @GetMapping("/admin/{id}")
    public ModelAndView showDashboardAdmin(@PathVariable("id") Long id) {
        ModelAndView modelAndView = new ModelAndView("/homeAdmin");
        UserDTO userDTO = userService.findUserDTOByID(id);
        modelAndView.addObject("user",userDTO);
        return modelAndView;
    }
}
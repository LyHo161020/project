package com.cg.cinestar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/customers")
public class CustomerController {
    @GetMapping("/phimdangchieu")
    public ModelAndView getListNowShowing() {
        return new ModelAndView("/customer/list_nowShowing");
    }
    @GetMapping
    public ModelAndView showHomePage() {
        return new ModelAndView("/customer_page/index");
    }

//    @GetMapping("/phim")
//    public ModelAndView getListMovie() {
//        return new ModelAndView("/customer/list_nowShowing");
//    }

}


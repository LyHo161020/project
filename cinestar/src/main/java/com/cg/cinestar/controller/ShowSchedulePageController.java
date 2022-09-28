package com.cg.cinestar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/lichchieu")
public class ShowSchedulePageController {
    @GetMapping
   public ModelAndView showCustomerPage(){
       return new ModelAndView("/customer_page/layout/show_schedule_page");
   }


}

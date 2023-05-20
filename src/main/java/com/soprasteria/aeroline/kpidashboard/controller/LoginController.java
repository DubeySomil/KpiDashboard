package com.soprasteria.aeroline.kpidashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.soprasteria.aeroline.kpidashboard.entity.LoginDetails;
import com.soprasteria.aeroline.kpidashboard.payload.UserDTO;
import com.soprasteria.aeroline.kpidashboard.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi")
public class LoginController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public UserDTO login(@RequestBody LoginDetails loginDetails) {
        return this.userService.checkUser(loginDetails);
    }
    
    @PostMapping("/access")
    public String provideAccess(@RequestBody LoginDetails loginDetails) {
        return this.userService.provideAccess(loginDetails);
    }

}

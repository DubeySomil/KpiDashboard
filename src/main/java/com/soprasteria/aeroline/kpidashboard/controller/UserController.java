package com.soprasteria.aeroline.kpidashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soprasteria.aeroline.kpidashboard.entity.Client;
import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;
import com.soprasteria.aeroline.kpidashboard.payload.AssignDTO;
import com.soprasteria.aeroline.kpidashboard.payload.PasswordUpdateDTO;
import com.soprasteria.aeroline.kpidashboard.payload.UserDTO;
import com.soprasteria.aeroline.kpidashboard.payload.UserUpdate;
import com.soprasteria.aeroline.kpidashboard.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi/v1")

public class UserController {
    
    @Autowired
    private UserService userService;

    // GET user by their ID
    @GetMapping("/users/{userName}")
    public UserDTO getUsers(@PathVariable String userName) {
        return this.userService.getUser(userName);
    }
    
    /* ****************************************************************************************************************************************** */

    // GET all users
    @GetMapping("/users")
    public List<UserDTO> get() {
        return this.userService.getAllUsers();
    }
    
    /* ****************************************************************************************************************************************** */

    // POST user
    @PostMapping("/")
    public void create(@RequestBody UserDTO userDetailsDTO) {
        this.userService.createUser(userDetailsDTO);
    }
    
    /* ****************************************************************************************************************************************** */

    // UPDATE user
    @PutMapping("/{userName}")
    public void update(@PathVariable String userName, @RequestBody UserDTO userDetailsDTO) {
        this.userService.updateUser(userName, userDetailsDTO);
    }
    
    /* ****************************************************************************************************************************************** */

    // UPDATE user
    @PutMapping("/update")
    public void updateUserStatusAndRole(@RequestBody UserUpdate userUpdate)  {
        this.userService.updateUserStatusAndRole(userUpdate);
    }
    
    /* ****************************************************************************************************************************************** */
    @DeleteMapping("/{userName}")
    public void delete(@PathVariable String userName) {
        this.userService.deleteUser(userName);
    }
    
    /* ****************************************************************************************************************************************** */

    // Assign role to user
    @PostMapping("/{userName}/{roleId}")
    public void assignRole(@PathVariable String userName, @PathVariable Integer roleId) {
        this.userService.assignRole(userName, roleId);
    }
    
    /* ****************************************************************************************************************************************** */

    // Assign Project to User
    @PutMapping("/{userName}/{projectId}")
    public void assignProject(@PathVariable String userName, @PathVariable Integer projectId) {
        this.userService.assignProject(userName, projectId);
    }
    
    //update users password
    @PutMapping("/updatePassword/{username}")
    public void changePassword(@PathVariable String username,@RequestBody PasswordUpdateDTO passwordupdatedto) {
    	this.userService.updatePassword(username,passwordupdatedto);
    }
    
    @GetMapping("/checkUserExist/{userName}")
    public void checkUserExist(@PathVariable String userName) {
    	this.userService.checkUserExist(userName);
    }

    // Assign 
    @PutMapping("/assign/{userName}")
    public void assignProject(@PathVariable String userName, @RequestBody AssignDTO assignDTO) {
        this.userService.assign(userName, assignDTO);
    }
}

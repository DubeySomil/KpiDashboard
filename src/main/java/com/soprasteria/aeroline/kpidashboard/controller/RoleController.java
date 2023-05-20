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
import com.soprasteria.aeroline.kpidashboard.payload.RoleDTO;
import com.soprasteria.aeroline.kpidashboard.service.RoleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi/v2")

public class RoleController {
    
    @Autowired
    private RoleService roleService;

    // GET role by their ID
    @GetMapping("/roles/{roleId}")
    public RoleDTO getRoles(@PathVariable int roleId) {
        return this.roleService.getRole(roleId);
    }
    
    /* ****************************************************************************************************************************************** */

    // GET all roles
    @GetMapping("/roles")
    public List<RoleDTO> get() {
        return this.roleService.getAllRoles();
    }
    
    /* ****************************************************************************************************************************************** */

    // POST role
    @PostMapping("/")
    public void create(@RequestBody RoleDTO roleDetailsDTO) {
        this.roleService.createRole(roleDetailsDTO);
    }
    
    /* ****************************************************************************************************************************************** */

    // UPDATE role
    @PutMapping("/{roleId}")
    public void update(@PathVariable int roleId, @RequestBody RoleDTO roleDetailsDTO) {
        this.roleService.updateRole(roleId, roleDetailsDTO);
    }
    
    /* ****************************************************************************************************************************************** */

    // DELETE role
    @DeleteMapping("/{roleId}")
    public void delete(@PathVariable int roleId) {
        this.roleService.deleteRole(roleId);
    }
}

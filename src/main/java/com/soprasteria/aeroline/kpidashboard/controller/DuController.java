package com.soprasteria.aeroline.kpidashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soprasteria.aeroline.kpidashboard.payload.DUDTO;
import com.soprasteria.aeroline.kpidashboard.service.DuService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi/v5")
public class DuController {
    
    @Autowired
    private DuService duService;

    // GET DU by their ID
    @GetMapping("/dus/{duId}")
    public DUDTO getdus(@PathVariable int duId) {
        return this.duService.getdu(duId);
    }
        
    /* ****************************************************************************************************************************************** */

    // GET all DUs
    @GetMapping("/dus")
    public List<DUDTO> get() {
        return this.duService.getAlldus();
    }

    /* ****************************************************************************************************************************************** */

    // Post DU
    @PostMapping("/")
    public void create(@RequestBody DUDTO dudto) {
        this.duService.postdu(dudto);
    }
}

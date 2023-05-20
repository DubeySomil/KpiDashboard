package com.soprasteria.aeroline.kpidashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.soprasteria.aeroline.kpidashboard.payload.DUDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCenterDTO;
import com.soprasteria.aeroline.kpidashboard.service.ProfitCenterService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi/v6")
public class ProfitCenterConroller {
    
    @Autowired
    private ProfitCenterService profitCenterService;

    // GET Profit Center by their ID
    @GetMapping("/profitcenters/{profitCenterId}")
    public ProfitCenterDTO getProfitCenters(@PathVariable int profitCenterId) {
        return this.profitCenterService.getProfitCenter(profitCenterId);
    }
        
    /* ****************************************************************************************************************************************** */

    // GET all Profit Centers
    @GetMapping("/profitcenters")
    public List<ProfitCenterDTO> get() {
        return this.profitCenterService.getAllProfitCenters();
    }

    /* ****************************************************************************************************************************************** */

    // GET Profit Centers by DU
    @GetMapping("/profitcenter/{duName}") 
    public List<ProfitCenterDTO> getProfitCenterbyDu(@PathVariable String duName) {
        System.out.println("hehe" + duName);
        return this.profitCenterService.getProfitCenterbyDu(duName);
    }

    // GET Profit Centers by DUs
    @GetMapping("/profitcentersbyDu") 
    public List<ProfitCenterDTO> getProfitCentersbyDus(@RequestParam List<String> dUs) {
        System.out.println("hehe");
        return this.profitCenterService.getProfitCentersbyDu(dUs);
    }

    @PostMapping("/")
    public void create(@RequestBody ProfitCenterDTO profitCenterDTO) {
        this.profitCenterService.postProfitCenter(profitCenterDTO);
    }
    
}

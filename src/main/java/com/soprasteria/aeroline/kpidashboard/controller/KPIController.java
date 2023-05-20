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
import com.soprasteria.aeroline.kpidashboard.payload.KPIDTO;
import com.soprasteria.aeroline.kpidashboard.service.KPIService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi/v4")

public class KPIController {
    
    @Autowired
    private KPIService kpiService;

    // GET KPI by their ID
    @GetMapping("/kpis/{kpiId}")
    public KPIDTO getKpis(@PathVariable int kpiId) {
        return this.kpiService.getKPI(kpiId);
    }
        
    /* ****************************************************************************************************************************************** */

    // GET all KPIs
    @GetMapping("/kpis")
    public List<KPIDTO> get() {
        return this.kpiService.getAllKPIs();
    }
        
    /* ****************************************************************************************************************************************** */

    // POST KPI
    @PostMapping("/")
    public void create(@RequestBody KPIDTO kpiDetailsDTO) {
        this.kpiService.createKPI(kpiDetailsDTO);
    }
        
    /* ****************************************************************************************************************************************** */

    // UPDATE KPI
    @PutMapping("/{kpiId}")
    public void update(@PathVariable int projectId, @RequestBody KPIDTO kpiDetailsDTO) {
        this.kpiService.updateKPI(projectId, kpiDetailsDTO);
    }
        
    /* ****************************************************************************************************************************************** */

    // DELETE KPI
    @DeleteMapping("/{projectId}")
    public void delete(@PathVariable int kpiId) {
        this.kpiService.deleteKPI(kpiId);
    }
}

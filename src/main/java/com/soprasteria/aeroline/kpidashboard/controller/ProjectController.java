package com.soprasteria.aeroline.kpidashboard.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectYearDTOUsePost;
import com.soprasteria.aeroline.kpidashboard.payload.KPIAll;
import com.soprasteria.aeroline.kpidashboard.payload.KPIboth;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectDTOUse;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse2;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse4;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectYearDTOUse;
import com.soprasteria.aeroline.kpidashboard.service.ProjectKPIService;
import com.soprasteria.aeroline.kpidashboard.service.ProjectService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi/v3")

public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectKPIService projectKPIService;

    // GET project by their ID
    @GetMapping("/projects/{projectId}")
    public ProjectDTO getProjects(@PathVariable int projectId) {
        return this.projectService.getProject(projectId);
    }

    // GET project by Username
    @GetMapping("/project/{userName}")
    public List<ProjectDTO> getProjectsByUserName(@PathVariable String userName) {
        return this.projectService.getProjectByUserName(userName);
    }

    // GET all projects
    @GetMapping("/projects")
    public List<ProjectDTO> get() {
        return this.projectService.getAllProjects();
    }
    
    /* ****************************************************************************************************************************************** */

    @PostMapping("/{userName}")
    public void create(@PathVariable String userName, @RequestBody ProjectDTOUse projectDTOUse) {
        this.projectService.createProject(userName, projectDTOUse);
    }
    
    /* ****************************************************************************************************************************************** */

    // UPDATE project
    @PutMapping("/{projectId}")
    public void update(@PathVariable int projectId, @RequestBody ProjectDTO projectDetailsDTO) {
        this.projectService.updateProject(projectId, projectDetailsDTO);
    } 

    /* ****************************************************************************************************************************************** */
    // UPDATE project
    @PostMapping("/update")
    public void updateProjectKPI(@RequestBody ProjectYearDTOUse projectYearDTOUse) {
        this.projectService.updateProjectKPI(projectYearDTOUse);
    } 

    /* ****************************************************************************************************************************************** */
    
    // UPDATE project
    @PostMapping("/updatecustom")
    public void updateProjectCustomKPI(@RequestBody CustomProjectYearDTOUsePost customProjectYearDTOUsePost) {
        this.projectService.updateProjectCustomKPI(customProjectYearDTOUsePost);
    } 

    /* ****************************************************************************************************************************************** */
    
    
    // DELETE project
    @DeleteMapping("/{projectId}")
    public void delete(@PathVariable int projectId) {
        this.projectService.deleteProject(projectId);
    } 
    
    @GetMapping("/getkpiThreshold/{projectId}")
    public HashMap<String, Integer> getKpi(@PathVariable int projectId) {
    	return this.projectService.getKpi(projectId);
    }
    
    @GetMapping("/getcustomKpiThreshold/{projectId}")
    public HashMap<String,Integer> getCustomKpiThreshold(@PathVariable int projectId){
    	return this.projectService.getCustomKpi(projectId);
    } 	
    @GetMapping("/getProjectDetailsFromName/{projectName}")
    public ProjectDTO getProjectFromName(@PathVariable String projectName) {
		
    	return this.projectService.getProjectFromName(projectName);
    	
    }

    @GetMapping("/{projectId}/{year}")
    public ProjectYearDTOUse getProject(@PathVariable int projectId, @PathVariable int year) {
        return this.projectKPIService.get(projectId, year);
    }

    @GetMapping("/kpis/{projectName}")
    public KPIboth getAllKpis(@PathVariable String projectName) {
        return this.projectKPIService.getAllKpis(projectName);
    }

    @GetMapping("/kpis/{projectName}/{kpiName}/{year}") 
    public ProjectKPIUse getKpisByMonth(@PathVariable String projectName, @PathVariable String kpiName, @PathVariable int year) {
        return this.projectService.getAllKpiByMonths(projectName, kpiName, year);
    }

    @GetMapping("/kpis/{projectName}/{year}") 
    public ProjectKPIUse2 getKpisByMonth2(@PathVariable String projectName, @PathVariable int year) {
        return this.projectService.getAllKpiByMonths2(projectName, year);
    }

    @GetMapping("/kpis/projects/{userName}")
    public List<ProjectDTO> getProjectbyAccess(@PathVariable String userName) {
        return this.projectService.getProjectbyAccess(userName);
    }

    @GetMapping("/kpisbyProjectIds") 
    public List<KPIAll> getProfitCentersbyDus(@RequestParam List<Integer> projectIds) {
        return this.projectService.getDistinctKpis(projectIds);
    }

    @GetMapping("/kpisbyProjectIdsAndYear/{year}") 
    public ProjectKPIUse4 getAllKpisByMonths3(@RequestParam List<Integer> projectIds, @RequestParam List<Integer> kpiIds, @PathVariable int year) {
        return this.projectService.getAllKpiByMonths3(projectIds, kpiIds, year);
    }
}

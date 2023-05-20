package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class ProjectYearDTOUse {
    private int projectId;
    private int year;
    private List<ProjectKPIYearMappingDTO> kpis = new ArrayList<>();
    private List<ProjectKPIYearJusti> justification = new ArrayList<>();

    private List<CustomProjectKPIYearMappingDTO> customKpis = new ArrayList<>();
    private List<CustomProjectKPIJusti> customJustification = new ArrayList<>();
    public int getProjectId() {
        return projectId;
    }
    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public List<ProjectKPIYearMappingDTO> getKpis() {
        return kpis;
    }
    public void setKpis(List<ProjectKPIYearMappingDTO> kpis) {
        this.kpis = kpis;
    }
    public List<ProjectKPIYearJusti> getJustification() {
        return justification;
    }
    public void setJustification(List<ProjectKPIYearJusti> justification) {
        this.justification = justification;
    }
    public List<CustomProjectKPIYearMappingDTO> getCustomKpis() {
        return customKpis;
    }
    public void setCustomKpis(List<CustomProjectKPIYearMappingDTO> customKpis) {
        this.customKpis = customKpis;
    }
    public List<CustomProjectKPIJusti> getCustomJustification() {
        return customJustification;
    }
    public void setCustomJustification(List<CustomProjectKPIJusti> customJustification) {
        this.customJustification = customJustification;
    }
    public ProjectYearDTOUse() {
    }
    public ProjectYearDTOUse(int projectId, int year, List<ProjectKPIYearMappingDTO> kpis,
            List<ProjectKPIYearJusti> justification, List<CustomProjectKPIYearMappingDTO> customKpis,
            List<CustomProjectKPIJusti> customJustification) {
        this.projectId = projectId;
        this.year = year;
        this.kpis = kpis;
        this.justification = justification;
        this.customKpis = customKpis;
        this.customJustification = customJustification;
    }
    
        
    
}

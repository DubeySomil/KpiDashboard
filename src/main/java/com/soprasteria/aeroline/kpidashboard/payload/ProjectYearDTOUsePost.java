package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class ProjectYearDTOUsePost {
    
    private int projectId;
    private int year;
    
    private List<ProjectKPIYearMappingDTOPost> kpis = new ArrayList<>();

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

    public List<ProjectKPIYearMappingDTOPost> getKpis() {
        return kpis;
    }

    public void setKpis(List<ProjectKPIYearMappingDTOPost> kpis) {
        this.kpis = kpis;
    }

    public ProjectYearDTOUsePost() {
    }

    public ProjectYearDTOUsePost(int projectId, int year, List<ProjectKPIYearMappingDTOPost> kpis) {
        this.projectId = projectId;
        this.year = year;
        this.kpis = kpis;
    }
    
    
    
    
}

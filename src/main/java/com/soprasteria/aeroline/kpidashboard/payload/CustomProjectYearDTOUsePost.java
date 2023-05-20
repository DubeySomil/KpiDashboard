package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class CustomProjectYearDTOUsePost {
    
    private int projectId;
    private int year;
    
    private List<CustomProjectKPIYearMappingDTOPost> customKpis = new ArrayList<>();
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
    
    public List<CustomProjectKPIYearMappingDTOPost> getCustomKpis() {
        return customKpis;
    }
    public void setCustomKpis(List<CustomProjectKPIYearMappingDTOPost> customKpis) {
        this.customKpis = customKpis;
    }
    public CustomProjectYearDTOUsePost() {
    }
    public CustomProjectYearDTOUsePost(int projectId, int year,
            List<CustomProjectKPIYearMappingDTOPost> customKpis) {
        this.projectId = projectId;
        this.year = year;
        this.customKpis = customKpis;
    }

    
    
}

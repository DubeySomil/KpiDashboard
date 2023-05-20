package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class ProjectDTOUse {
    
    private String projectName;
    private String projectType;
    private String projectDU;
    private String projectProfitCenter;
    private String projectClient;
    private String projectDI;
    private String projectMethodology;
    private String projectFrequency;
    
    private List<ProjectKPIMappingDTO> kpis = new ArrayList<>();
    private List<CustomProjectKPIMappingDTO> customKpis = new ArrayList<>();
    public String getProjectName() {
        return projectName;
    }
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    public String getProjectType() {
        return projectType;
    }
    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }
    public String getProjectDU() {
        return projectDU;
    }
    public void setProjectDU(String projectDU) {
        this.projectDU = projectDU;
    }
    public String getProjectProfitCenter() {
        return projectProfitCenter;
    }
    public void setProjectProfitCenter(String projectProfitCenter) {
        this.projectProfitCenter = projectProfitCenter;
    }
    public String getProjectClient() {
        return projectClient;
    }
    public void setProjectClient(String projectClient) {
        this.projectClient = projectClient;
    }
    public String getProjectDI() {
        return projectDI;
    }
    public void setProjectDI(String projectDI) {
        this.projectDI = projectDI;
    }
    public String getProjectMethodology() {
        return projectMethodology;
    }
    public void setProjectMethodology(String projectMethodology) {
        this.projectMethodology = projectMethodology;
    }
    public String getProjectFrequency() {
        return projectFrequency;
    }
    public void setProjectFrequency(String projectFrequency) {
        this.projectFrequency = projectFrequency;
    }
    public List<ProjectKPIMappingDTO> getKpis() {
        return kpis;
    }
    public void setKpis(List<ProjectKPIMappingDTO> kpis) {
        this.kpis = kpis;
    }
    public List<CustomProjectKPIMappingDTO> getCustomKpis() {
        return customKpis;
    }
    public void setCustomKpis(List<CustomProjectKPIMappingDTO> customKpis) {
        this.customKpis = customKpis;
    }
    public ProjectDTOUse() {
    }
    public ProjectDTOUse(String projectName, String projectType, String projectDU, String projectProfitCenter,
            String projectClient, String projectDI, String projectMethodology, String projectFrequency,
            List<ProjectKPIMappingDTO> kpis, List<CustomProjectKPIMappingDTO> customKpis) {
        this.projectName = projectName;
        this.projectType = projectType;
        this.projectDU = projectDU;
        this.projectProfitCenter = projectProfitCenter;
        this.projectClient = projectClient;
        this.projectDI = projectDI;
        this.projectMethodology = projectMethodology;
        this.projectFrequency = projectFrequency;
        this.kpis = kpis;
        this.customKpis = customKpis;
    }
    
    
}

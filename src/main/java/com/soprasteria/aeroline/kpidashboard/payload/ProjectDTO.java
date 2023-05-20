package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class ProjectDTO {

    private int projectID;
    private String projectName;
    private String projectType;
    private String projectDU;
    private String projectProfitCenter;
    private String projectClient;
    private String projectDI;
    private String projectMethodology;
    private String projectFrequency;
    private String projectManager;

    private List<KPIDTO> kpiList = new ArrayList<>();
    private List<CustomKPIDTO> customKpiList = new ArrayList<>();
    public int getProjectID() {
        return projectID;
    }
    public void setProjectID(int projectID) {
        this.projectID = projectID;
    }
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
    public String getProjectManager() {
        return projectManager;
    }
    public void setProjectManager(String projectManager) {
        this.projectManager = projectManager;
    }
    public List<KPIDTO> getKpiList() {
        return kpiList;
    }
    public void setKpiList(List<KPIDTO> kpiList) {
        this.kpiList = kpiList;
    }
    public List<CustomKPIDTO> getCustomKpiList() {
        return customKpiList;
    }
    public void setCustomKpiList(List<CustomKPIDTO> customKpiList) {
        this.customKpiList = customKpiList;
    }
    public ProjectDTO() {
    }
    public ProjectDTO(int projectID, String projectName, String projectType, String projectDU,
            String projectProfitCenter, String projectClient, String projectDI, String projectMethodology,
            String projectFrequency, String projectManager, List<KPIDTO> kpiList, List<CustomKPIDTO> customKpiList) {
        this.projectID = projectID;
        this.projectName = projectName;
        this.projectType = projectType;
        this.projectDU = projectDU;
        this.projectProfitCenter = projectProfitCenter;
        this.projectClient = projectClient;
        this.projectDI = projectDI;
        this.projectMethodology = projectMethodology;
        this.projectFrequency = projectFrequency;
        this.projectManager = projectManager;
        this.kpiList = kpiList;
        this.customKpiList = customKpiList;
    }
    
    
    

}

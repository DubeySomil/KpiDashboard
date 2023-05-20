package com.soprasteria.aeroline.kpidashboard.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectID;
    private String projectName;
    private String projectType;
    private String projectDI;
    private String projectMethodology;
    private String projectFrequency;
    private String projectManager;

    @ManyToMany(mappedBy = "projects", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<User> users = new ArrayList<>();

    @ManyToMany
    private List<KPI> kpiList = new ArrayList<>();

    @ManyToMany
    private List<CustomKPI> customKpiList = new ArrayList<>();

    @OneToMany(mappedBy = "kpiId")
    private List<ProjectKPIMapping> kpis = new ArrayList<>();
    
    @OneToMany(mappedBy = "customKpiId")
    private List<CustomProjectKPIMapping> customKpis = new ArrayList<>();

    @OneToMany(mappedBy = "kpiId")
    private List<ProjectKPIYearMapping> kpiYears = new ArrayList<>();

    @ManyToOne
    private Du projectDU;

    @ManyToOne
    private ProfitCenter projectProfitCenter;

    @ManyToOne
    private Client projectClient;

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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<KPI> getKpiList() {
        return kpiList;
    }

    public void setKpiList(List<KPI> kpiList) {
        this.kpiList = kpiList;
    }

    public List<CustomKPI> getCustomKpiList() {
        return customKpiList;
    }

    public void setCustomKpiList(List<CustomKPI> customKpiList) {
        this.customKpiList = customKpiList;
    }

    public List<ProjectKPIMapping> getKpis() {
        return kpis;
    }

    public void setKpis(List<ProjectKPIMapping> kpis) {
        this.kpis = kpis;
    }

    public List<CustomProjectKPIMapping> getCustomKpis() {
        return customKpis;
    }

    public void setCustomKpis(List<CustomProjectKPIMapping> customKpis) {
        this.customKpis = customKpis;
    }

    public List<ProjectKPIYearMapping> getKpiYears() {
        return kpiYears;
    }

    public void setKpiYears(List<ProjectKPIYearMapping> kpiYears) {
        this.kpiYears = kpiYears;
    }

    public Du getProjectDU() {
        return projectDU;
    }

    public void setProjectDU(Du projectDU) {
        this.projectDU = projectDU;
    }

    public ProfitCenter getProjectProfitCenter() {
        return projectProfitCenter;
    }

    public void setProjectProfitCenter(ProfitCenter projectProfitCenter) {
        this.projectProfitCenter = projectProfitCenter;
    }

    public Client getProjectClient() {
        return projectClient;
    }

    public void setProjectClient(Client projectClient) {
        this.projectClient = projectClient;
    }

    public Project() {
    }

    public Project(int projectID, String projectName, String projectType, String projectDI, String projectMethodology,
            String projectFrequency, String projectManager, List<User> users, List<KPI> kpiList,
            List<CustomKPI> customKpiList, List<ProjectKPIMapping> kpis, List<CustomProjectKPIMapping> customKpis,
            List<ProjectKPIYearMapping> kpiYears, Du projectDU, ProfitCenter projectProfitCenter,
            Client projectClient) {
        this.projectID = projectID;
        this.projectName = projectName;
        this.projectType = projectType;
        this.projectDI = projectDI;
        this.projectMethodology = projectMethodology;
        this.projectFrequency = projectFrequency;
        this.projectManager = projectManager;
        this.users = users;
        this.kpiList = kpiList;
        this.customKpiList = customKpiList;
        this.kpis = kpis;
        this.customKpis = customKpis;
        this.kpiYears = kpiYears;
        this.projectDU = projectDU;
        this.projectProfitCenter = projectProfitCenter;
        this.projectClient = projectClient;
    }

    
}
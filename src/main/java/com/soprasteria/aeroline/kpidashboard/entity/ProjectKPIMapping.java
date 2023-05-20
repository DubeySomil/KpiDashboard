package com.soprasteria.aeroline.kpidashboard.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProjectKPIMapping {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectKPIid;
    private int kpiId;
    private int kpiThreshold;
    private int projectId;
    public int getProjectKPIid() {
        return projectKPIid;
    }
    public void setProjectKPIid(int projectKPIid) {
        this.projectKPIid = projectKPIid;
    }
    public int getProjectId() {
        return projectId;
    }
    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
    public int getKpiId() {
        return kpiId;
    }
    public void setKpiId(int kpiId) {
        this.kpiId = kpiId;
    }
    public int getKpiThreshold() {
        return kpiThreshold;
    }
    public void setKpiThreshold(int kpiThreshold) {
        this.kpiThreshold = kpiThreshold;
    }
    public ProjectKPIMapping() {
    }
    public ProjectKPIMapping(int projectKPIid,int projectId, int kpiId, int kpiThreshold) {
        this.projectKPIid = projectKPIid;
        this.projectId = projectId;
        this.kpiId = kpiId;
        this.kpiThreshold = kpiThreshold;
    }
    

}

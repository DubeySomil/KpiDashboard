package com.soprasteria.aeroline.kpidashboard.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomProjectKPIMapping {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customProjectKPIid;
    private int customProjectId;
    private int customKpiId;
    private int customKpiThreshold;
    
    public int getCustomProjectKPIid() {
        return customProjectKPIid;
    }
    public void setCustomProjectKPIid(int customProjectKPIid) {
        this.customProjectKPIid = customProjectKPIid;
    }
    public int getCustomProjectId() {
        return customProjectId;
    }
    public void setCustomProjectId(int customProjectId) {
        this.customProjectId = customProjectId;
    }
    public int getCustomKpiId() {
        return customKpiId;
    }
    public void setCustomKpiId(int customKpiId) {
        this.customKpiId = customKpiId;
    }
    public int getCustomKpiThreshold() {
        return customKpiThreshold;
    }
    public void setCustomKpiThreshold(int customKpiThreshold) {
        this.customKpiThreshold = customKpiThreshold;
    }
    public CustomProjectKPIMapping() {
    }
    public CustomProjectKPIMapping(int customProjectKPIid, int customProjectId, int customKpiId,
            int customKpiThreshold) {
        this.customProjectKPIid = customProjectKPIid;
        this.customProjectId = customProjectId;
        this.customKpiId = customKpiId;
        this.customKpiThreshold = customKpiThreshold;
    }
    
    
}

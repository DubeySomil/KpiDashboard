package com.soprasteria.aeroline.kpidashboard.payload;

public class ProjectKPIMappingDTO {
   
    private int kpiId;
    private int kpiThreshold;

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
    public ProjectKPIMappingDTO() {
    }
    public ProjectKPIMappingDTO(int kpiId, int kpiThreshold) {
        this.kpiId = kpiId;
        this.kpiThreshold = kpiThreshold;
    }
      
    
}

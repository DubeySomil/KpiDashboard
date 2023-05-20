package com.soprasteria.aeroline.kpidashboard.payload;

public class CustomProjectKPIMappingDTO {
    private int customKpiId;
    private String customKpiName;
    private int customKpiThreshold;
    public int getCustomKpiId() {
        return customKpiId;
    }
    public void setCustomKpiId(int customKpiId) {
        this.customKpiId = customKpiId;
    }
    public String getCustomKpiName() {
        return customKpiName;
    }
    public void setCustomKpiName(String customKpiName) {
        this.customKpiName = customKpiName;
    }
    public int getCustomKpiThreshold() {
        return customKpiThreshold;
    }
    public void setCustomKpiThreshold(int customKpiThreshold) {
        this.customKpiThreshold = customKpiThreshold;
    }
    public CustomProjectKPIMappingDTO() {
    }
    public CustomProjectKPIMappingDTO(int customKpiId, String customKpiName, int customKpiThreshold) {
        this.customKpiId = customKpiId;
        this.customKpiName = customKpiName;
        this.customKpiThreshold = customKpiThreshold;
    }

    
}

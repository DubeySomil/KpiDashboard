package com.soprasteria.aeroline.kpidashboard.payload;

public class CustomKPIDTO {
    private int customKpiId;
    private String customKpiName;
    
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
    public CustomKPIDTO() {
    }
    public CustomKPIDTO(int customKpiId, String customKpiName) {
        this.customKpiId = customKpiId;
        this.customKpiName = customKpiName;
    }

    
    
}

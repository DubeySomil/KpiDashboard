package com.soprasteria.aeroline.kpidashboard.payload;

public class CustomProjectKPIYearMappingDTO {
    private int customKpiId;
    private String customKpiName;
    private int customKpiThreshold;
    
    private MonthDTO month;

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

    public MonthDTO getMonth() {
        return month;
    }

    public void setMonth(MonthDTO month) {
        this.month = month;
    }

    public CustomProjectKPIYearMappingDTO() {
    }

    public CustomProjectKPIYearMappingDTO(int customKpiId, String customKpiName, int customKpiThreshold,
            MonthDTO month) {
        this.customKpiId = customKpiId;
        this.customKpiName = customKpiName;
        this.customKpiThreshold = customKpiThreshold;
        this.month = month;
    }

    
}

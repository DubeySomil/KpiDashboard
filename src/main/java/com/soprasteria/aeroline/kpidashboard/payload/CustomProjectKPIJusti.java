package com.soprasteria.aeroline.kpidashboard.payload;

public class CustomProjectKPIJusti {
    private int customKpiId;
    private String customKpiName;
    private int customKpiThreshold;
    
    private MonthJustiDTO monthJustiDTO;

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

    public MonthJustiDTO getMonthJustiDTO() {
        return monthJustiDTO;
    }

    public void setMonthJustiDTO(MonthJustiDTO monthJustiDTO) {
        this.monthJustiDTO = monthJustiDTO;
    }

    public CustomProjectKPIJusti() {
    }

    public CustomProjectKPIJusti(int customKpiId, String customKpiName, int customKpiThreshold,
            MonthJustiDTO monthJustiDTO) {
        this.customKpiId = customKpiId;
        this.customKpiName = customKpiName;
        this.customKpiThreshold = customKpiThreshold;
        this.monthJustiDTO = monthJustiDTO;
    }

    
    
}

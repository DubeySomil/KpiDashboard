package com.soprasteria.aeroline.kpidashboard.payload;

public class ProjectKPIYearJusti {
    
    private int kpiId;
    private String kpiName;
    private int kpiThreshold;
    
    private MonthJustiDTO monthJustiDTO;

    public int getKpiId() {
        return kpiId;
    }

    public void setKpiId(int kpiId) {
        this.kpiId = kpiId;
    }

    public String getKpiName() {
        return kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public int getKpiThreshold() {
        return kpiThreshold;
    }

    public void setKpiThreshold(int kpiThreshold) {
        this.kpiThreshold = kpiThreshold;
    }

    public MonthJustiDTO getMonthJustiDTO() {
        return monthJustiDTO;
    }

    public void setMonthJustiDTO(MonthJustiDTO monthJustiDTO) {
        this.monthJustiDTO = monthJustiDTO;
    }

    public ProjectKPIYearJusti() {
    }

    public ProjectKPIYearJusti(int kpiId, String kpiName, int kpiThreshold, MonthJustiDTO monthJustiDTO) {
        this.kpiId = kpiId;
        this.kpiName = kpiName;
        this.kpiThreshold = kpiThreshold;
        this.monthJustiDTO = monthJustiDTO;
    }

    
}

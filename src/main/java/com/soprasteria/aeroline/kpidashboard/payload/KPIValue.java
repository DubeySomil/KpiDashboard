package com.soprasteria.aeroline.kpidashboard.payload;

public class KPIValue {
    private String kpiName;
    private int kpiValue;

    public String getKpiName() {
        return kpiName;
    }
    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }
    public int getKpiValue() {
        return kpiValue;
    }
    public void setKpiValue(int kpiValue) {
        this.kpiValue = kpiValue;
    }
    public KPIValue() {
    }
    public KPIValue(String kpiName, int kpiValue) {
        this.kpiName = kpiName;
        this.kpiValue = kpiValue;
    }

    
    
}

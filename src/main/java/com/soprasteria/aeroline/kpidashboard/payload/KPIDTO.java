package com.soprasteria.aeroline.kpidashboard.payload;

public class KPIDTO {

    private int kpiId;
    private String kpiName;

    private String kpiDesc;

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

    public String getKpiDesc() {
        return kpiDesc;
    }

    public void setKpiDesc(String kpiDesc) {
        this.kpiDesc = kpiDesc;
    }

    public KPIDTO() {
    }

    public KPIDTO(int kpiId, String kpiName, String kpiDesc) {
        this.kpiId = kpiId;
        this.kpiName = kpiName;
        this.kpiDesc = kpiDesc;
    }

    
    
    
}

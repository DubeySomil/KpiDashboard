package com.soprasteria.aeroline.kpidashboard.payload;

public class KPIUse {
    private String month;
    private int KPI;
    private int threshold;

    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
    public int getKPI() {
        return KPI;
    }
    public void setKPI(int kPI) {
        KPI = kPI;
    }
    public int getThreshold() {
        return threshold;
    }
    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }
    public KPIUse() {
    }
    public KPIUse(String month, int kPI, int threshold) {
        this.month = month;
        KPI = kPI;
        this.threshold = threshold;
    }

        
}

package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class ProjectKPIUse {
    private List<KPIUse> kpis = new ArrayList<>();

    public List<KPIUse> getKpis() {
        return kpis;
    }

    public void setKpis(List<KPIUse> kpis) {
        this.kpis = kpis;
    }

    public ProjectKPIUse() {
    }

    public ProjectKPIUse(List<KPIUse> kpis) {
        this.kpis = kpis;
    }
    
}

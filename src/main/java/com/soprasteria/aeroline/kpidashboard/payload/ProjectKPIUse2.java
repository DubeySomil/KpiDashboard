package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class ProjectKPIUse2 {
    private List<KPIUse2> kpis = new ArrayList<>();

    public List<KPIUse2> getKpis() {
        return kpis;
    }

    public void setKpis(List<KPIUse2> kpis) {
        this.kpis = kpis;
    }

    public ProjectKPIUse2() {
    }

    public ProjectKPIUse2(List<KPIUse2> kpis) {
        this.kpis = kpis;
    }

    
}

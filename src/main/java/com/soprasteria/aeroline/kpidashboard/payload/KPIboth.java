package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class KPIboth {
    
    private List<KPIDTOmin> kpis = new ArrayList<>();

    public List<KPIDTOmin> getKpis() {
        return kpis;
    }

    public void setKpis(List<KPIDTOmin> kpis) {
        this.kpis = kpis;
    }

    public KPIboth(List<KPIDTOmin> kpis) {
        this.kpis = kpis;
    }

    public KPIboth() {
    }

    
}

package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class ProfitCentersDTO {
    private List<ProfitCenterDTO> profitCenters = new ArrayList<>();

    public List<ProfitCenterDTO> getProfitCenters() {
        return profitCenters;
    }

    public void setProfitCenters(List<ProfitCenterDTO> profitCenters) {
        this.profitCenters = profitCenters;
    }

    public ProfitCentersDTO() {
    }

    public ProfitCentersDTO(List<ProfitCenterDTO> profitCenters) {
        this.profitCenters = profitCenters;
    }

    
    
    
}

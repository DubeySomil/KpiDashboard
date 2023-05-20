package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

public class DUsDTO {
    private List<DUDTO> dUs = new ArrayList<>();

    public List<DUDTO> getdUs() {
        return dUs;
    }

    public void setdUs(List<DUDTO> dUs) {
        this.dUs = dUs;
    }

    public DUsDTO() {
    }

    public DUsDTO(List<DUDTO> dUs) {
        this.dUs = dUs;
    }

    
}

package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class AssignDTO {
    
    private boolean checkbox;
    private String role;

    private List<DUDTO> dUs = new ArrayList<>();
    private List<ProfitCenterDTO> profitCenters = new ArrayList<>();
    private List<ClientDTO> clients = new ArrayList<>();
    public boolean isCheckbox() {
        return checkbox;
    }
    public void setCheckbox(boolean checkbox) {
        this.checkbox = checkbox;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public List<DUDTO> getdUs() {
        return dUs;
    }
    public void setdUs(List<DUDTO> dUs) {
        this.dUs = dUs;
    }
    public List<ProfitCenterDTO> getProfitCenters() {
        return profitCenters;
    }
    public void setProfitCenters(List<ProfitCenterDTO> profitCenters) {
        this.profitCenters = profitCenters;
    }
    public List<ClientDTO> getClients() {
        return clients;
    }
    public void setClients(List<ClientDTO> clients) {
        this.clients = clients;
    }
    public AssignDTO() {
    }
    public AssignDTO(boolean checkbox, String role, List<DUDTO> dUs, List<ProfitCenterDTO> profitCenters,
            List<ClientDTO> clients) {
        this.checkbox = checkbox;
        this.role = role;
        this.dUs = dUs;
        this.profitCenters = profitCenters;
        this.clients = clients;
    }
    
    
    
}

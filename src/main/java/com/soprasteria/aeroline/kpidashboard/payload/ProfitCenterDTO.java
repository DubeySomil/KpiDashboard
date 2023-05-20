package com.soprasteria.aeroline.kpidashboard.payload;

public class ProfitCenterDTO {
    private int id;
    private String name;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public ProfitCenterDTO() {
    }
    public ProfitCenterDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    
    
}

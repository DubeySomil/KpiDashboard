package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.HashMap;

public class KPIUse2 {
    private String month;
    private HashMap<String,Integer> values = new HashMap<String,Integer>();
    
    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
    public HashMap<String, Integer> getValues() {
        return values;
    }
    public void setValues(HashMap<String, Integer> values) {
        this.values = values;
    }
    public KPIUse2() {
    }
    public KPIUse2(String month, HashMap<String, Integer> values) {
        this.month = month;
        this.values = values;
    }
    
    
}

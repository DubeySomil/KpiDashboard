package com.soprasteria.aeroline.kpidashboard.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class CustomKPI {

    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_sequence")
    @SequenceGenerator(name = "my_sequence", sequenceName = "my_sequence_name", allocationSize = 1, initialValue = 18)
    private int customKpiId;
    private String customKpiName;

    public int getCustomKpiId() {
        return customKpiId;
    }

    public void setCustomKpiId(int customKpiId) {
        this.customKpiId = customKpiId;
    }

    public String getCustomKpiName() {
        return customKpiName;
    }

    public void setCustomKpiName(String customKpiName) {
        this.customKpiName = customKpiName;
    }

    public CustomKPI() {
    }

    public CustomKPI(int customKpiId, String customKpiName) {
        this.customKpiId = customKpiId;
        this.customKpiName = customKpiName;
    }

}

package com.soprasteria.aeroline.kpidashboard.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Du {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int duId;
    private String duName;

    @OneToMany
    private List<Project> projects = new ArrayList<>();
    
    @OneToMany
    private List<ProfitCenter> profitCenters = new ArrayList<>();

    @ManyToMany
    private List<User> users = new ArrayList<>();

    public int getDuId() {
        return duId;
    }

    public void setDuId(int duId) {
        this.duId = duId;
    }

    public String getDuName() {
        return duName;
    }

    public void setDuName(String duName) {
        this.duName = duName;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<ProfitCenter> getProfitCenters() {
        return profitCenters;
    }

    public void setProfitCenters(List<ProfitCenter> profitCenters) {
        this.profitCenters = profitCenters;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Du() {
    }

    public Du(int duId, String duName, List<Project> projects, List<ProfitCenter> profitCenters, List<User> users) {
        this.duId = duId;
        this.duName = duName;
        this.projects = projects;
        this.profitCenters = profitCenters;
        this.users = users;
    }

    
}

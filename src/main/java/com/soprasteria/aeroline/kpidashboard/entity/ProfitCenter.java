package com.soprasteria.aeroline.kpidashboard.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class ProfitCenter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profitCenterId;
    private String profitCenterName;

    @OneToMany
    private List<Project> projects = new ArrayList<>();

    @ManyToOne
    private Du du;

    @ManyToMany
    private List<User> users = new ArrayList<>();


    @OneToMany
    private List<Client> clients = new ArrayList<>();


    public int getProfitCenterId() {
        return profitCenterId;
    }


    public void setProfitCenterId(int profitCenterId) {
        this.profitCenterId = profitCenterId;
    }


    public String getProfitCenterName() {
        return profitCenterName;
    }


    public void setProfitCenterName(String profitCenterName) {
        this.profitCenterName = profitCenterName;
    }


    public List<Project> getProjects() {
        return projects;
    }


    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }


    public Du getDu() {
        return du;
    }


    public void setDu(Du du) {
        this.du = du;
    }


    public List<User> getUsers() {
        return users;
    }


    public void setUsers(List<User> users) {
        this.users = users;
    }


    public List<Client> getClients() {
        return clients;
    }


    public void setClients(List<Client> clients) {
        this.clients = clients;
    }


    public ProfitCenter() {
    }


    public ProfitCenter(int profitCenterId, String profitCenterName, List<Project> projects, Du du, List<User> users,
            List<Client> clients) {
        this.profitCenterId = profitCenterId;
        this.profitCenterName = profitCenterName;
        this.projects = projects;
        this.du = du;
        this.users = users;
        this.clients = clients;
    }


    
    
}

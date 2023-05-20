package com.soprasteria.aeroline.kpidashboard.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class User {

    @Id
    @Column(name = "User_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(name = "Last_Name")
    private String userLastName;

    @Column(name = "First_Name")
    private String userFirstName;

    @Column(name = "User_Name")
    private String userName;

    @Column(name = "Email")
    private String userEmail;

    @Column(name = "Manager")
    private String userManager;

    private String userPassword;

    @Column(name = "Status")
    private boolean userStatus;

    @ManyToOne
    private Role role;

    @ManyToMany
    private List<Du> dus = new ArrayList<>();

    @ManyToMany
    private List<ProfitCenter> profitCenters = new ArrayList<>();

    @ManyToMany
    private List<Client> clients = new ArrayList<>();

    

    @ManyToMany
    private List<Project> projects = new ArrayList<>();



    public long getUserId() {
        return userId;
    }



    public void setUserId(long userId) {
        this.userId = userId;
    }



    public String getUserLastName() {
        return userLastName;
    }



    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }



    public String getUserFirstName() {
        return userFirstName;
    }



    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }



    public String getUserName() {
        return userName;
    }



    public void setUserName(String userName) {
        this.userName = userName;
    }



    public String getUserEmail() {
        return userEmail;
    }



    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }



    public String getUserManager() {
        return userManager;
    }



    public void setUserManager(String userManager) {
        this.userManager = userManager;
    }



    public String getUserPassword() {
        return userPassword;
    }



    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }



    public boolean isUserStatus() {
        return userStatus;
    }



    public void setUserStatus(boolean userStatus) {
        this.userStatus = userStatus;
    }



    public Role getRole() {
        return role;
    }



    public void setRole(Role role) {
        this.role = role;
    }



    public List<Du> getDus() {
        return dus;
    }



    public void setDus(List<Du> dus) {
        this.dus = dus;
    }



    public List<ProfitCenter> getProfitCenters() {
        return profitCenters;
    }



    public void setProfitCenters(List<ProfitCenter> profitCenters) {
        this.profitCenters = profitCenters;
    }



    public List<Client> getClients() {
        return clients;
    }



    public void setClients(List<Client> clients) {
        this.clients = clients;
    }



    public List<Project> getProjects() {
        return projects;
    }



    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }



    public User() {
    }



    public User(long userId, String userLastName, String userFirstName, String userName, String userEmail,
            String userManager, String userPassword, boolean userStatus, Role role, List<Du> dus,
            List<ProfitCenter> profitCenters, List<Client> clients, List<Project> projects) {
        this.userId = userId;
        this.userLastName = userLastName;
        this.userFirstName = userFirstName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userManager = userManager;
        this.userPassword = userPassword;
        this.userStatus = userStatus;
        this.role = role;
        this.dus = dus;
        this.profitCenters = profitCenters;
        this.clients = clients;
        this.projects = projects;
    }

    
      

}
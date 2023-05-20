package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.List;

import com.soprasteria.aeroline.kpidashboard.entity.Role;

public class UserDTO {

    private String userLastName;
    private String userFirstName;
    private String userName;
    private String userEmail;
    private String userPassword;
    private boolean userStatus;
    private RoleDTO userRole;

    private List<DUDTO> dus = new ArrayList<>();

    private List<ProfitCenterDTO> profitCenters = new ArrayList<>();

    private List<ClientDTO> clients = new ArrayList<>();

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

    public RoleDTO getUserRole() {
        return userRole;
    }

    public void setUserRole(RoleDTO userRole) {
        this.userRole = userRole;
    }

    public List<DUDTO> getDus() {
        return dus;
    }

    public void setDus(List<DUDTO> dus) {
        this.dus = dus;
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

    public UserDTO() {
    }

    public UserDTO(String userLastName, String userFirstName, String userName, String userEmail, String userPassword,
            boolean userStatus, RoleDTO userRole, List<DUDTO> dus, List<ProfitCenterDTO> profitCenters,
            List<ClientDTO> clients) {
        this.userLastName = userLastName;
        this.userFirstName = userFirstName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userStatus = userStatus;
        this.userRole = userRole;
        this.dus = dus;
        this.profitCenters = profitCenters;
        this.clients = clients;
    }

    
    
}

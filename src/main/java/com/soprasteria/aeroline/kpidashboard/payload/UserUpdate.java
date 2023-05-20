package com.soprasteria.aeroline.kpidashboard.payload;

import org.springframework.stereotype.Component;

@Component
public class UserUpdate {
    private boolean checkbox;
    private String role;
    private String userName;
    
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
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public UserUpdate() {
    }
    public UserUpdate(boolean checkbox, String role, String userName) {
        this.checkbox = checkbox;
        this.role = role;
        this.userName = userName;
    }

    
        
}

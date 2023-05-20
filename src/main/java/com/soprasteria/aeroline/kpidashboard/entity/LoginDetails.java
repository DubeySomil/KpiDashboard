package com.soprasteria.aeroline.kpidashboard.entity;

import org.springframework.stereotype.Component;

@Component
public class LoginDetails {

    private String loginName;
    private String loginPassword;

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getLoginPassword() {
        return loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }

    public LoginDetails() {
    }

    public LoginDetails(String loginName, String loginPassword) {
        this.loginName = loginName;
        this.loginPassword = loginPassword;
    }

}

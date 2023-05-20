package com.soprasteria.aeroline.kpidashboard.payload;

public class UserDTOmin {

   
    private String userName;
   
    
    private RoleDTOmin role;


    public String getUserName() {
        return userName;
    }


    public void setUserName(String userName) {
        this.userName = userName;
    }


    public RoleDTOmin getRole() {
        return role;
    }


    public void setRole(RoleDTOmin role) {
        this.role = role;
    }


    public UserDTOmin() {
    }


    public UserDTOmin(String userName, RoleDTOmin role) {
        this.userName = userName;
        this.role = role;
    }

    
    // private List<ProjectDetailsDTO> projects = new ArrayList<>();

    // public UserDetailsDTO(long userID, String userLastName, String userFirstName, String userName, String userEmail,
    //         String userManager, String userPassword, RoleDetails role) {
    //     this.userID = userID;
    //     this.userLastName = userLastName;
    //     this.userFirstName = userFirstName;
    //     this.userName = userName;
    //     this.userEmail = userEmail;
    //     this.userManager = userManager;
    //     this.userPassword = userPassword;
    // }

    // public UserDetailsDTO() {
    // }

    // public long getUserID() {
    //     return userID;
    // }

    // public void setUserID(long userID) {
    //     this.userID = userID;
    // }

    // public String getUserLastName() {
    //     return userLastName;
    // }

    // public void setUserLastName(String userLastName) {
    //     this.userLastName = userLastName;
    // }

    // public String getUserFirstName() {
    //     return userFirstName;
    // }

    // public void setUserFirstName(String userFirstName) {
    //     this.userFirstName = userFirstName;
    // }

    // public String getUserName() {
    //     return userName;
    // }

    // public void setUserName(String userName) {
    //     this.userName = userName;
    // }

    // public String getUserEmail() {
    //     return userEmail;
    // }

    // public void setUserEmail(String userEmail) {
    //     this.userEmail = userEmail;
    // }

    // public String getUserManager() {
    //     return userManager;
    // }

    // public void setUserManager(String userManager) {
    //     this.userManager = userManager;
    // }

    // public String getUserPassword() {
    //     return userPassword;
    // }

    // public void setUserPassword(String userPassword) {
    //     this.userPassword = userPassword;
    // }

    // public boolean isUserStatus() {
    //     return userStatus;
    // }

    // public void setUserStatus(boolean userStatus) {
    //     this.userStatus = userStatus;
    // }

    // public RoleDetailsDTO getRole() {
    //     return role;
    // }

    // public void setRole(RoleDetailsDTO role) {
    //     this.role = role;
    // }

    // public List<ProjectDetailsDTO> getProjects() {
    //     return projects;
    // }

    // public void setProjects(List<ProjectDetailsDTO> projects) {
    //     this.projects = projects;
    // }

    

}

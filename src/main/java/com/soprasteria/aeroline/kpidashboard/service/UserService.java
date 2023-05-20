package com.soprasteria.aeroline.kpidashboard.service;

import java.util.List;

import com.soprasteria.aeroline.kpidashboard.entity.LoginDetails;
import com.soprasteria.aeroline.kpidashboard.payload.AssignDTO;
import com.soprasteria.aeroline.kpidashboard.payload.PasswordUpdateDTO;
import com.soprasteria.aeroline.kpidashboard.payload.UserDTO;
import com.soprasteria.aeroline.kpidashboard.payload.UserUpdate;

public interface UserService {
    
    /* ****************************************CREATE*********************************************** */

    public void createUser(UserDTO userDetailsDTO);
    public UserDTO checkUser(LoginDetails loginDetails);
    public String provideAccess(LoginDetails loginDetails);
    public void assignRole(String userName, int roleId);

    /* ****************************************READ*********************************************** */
    
    public UserDTO getUser(String userName);
    public List<UserDTO> getAllUsers();
    
    /* ****************************************UPDATE*********************************************** */
    
    public void updateUser(String userName, UserDTO userDetailsDTO);
    public void assignProject(String userName, int projectId);
    public void updateUserStatusAndRole(UserUpdate userUpdate);
    
    /* ****************************************DELETE*********************************************** */
    public void deleteUser(String userName);
    
    /* ****************************************UPDATE*********************************************** */
	public void updatePassword(String username, PasswordUpdateDTO passwordupdatedto);
	
	 /* ****************************************UPDATE*********************************************** */
	public void checkUserExist(String username);

    public void assign(String userName, AssignDTO assignDTO);

    
}

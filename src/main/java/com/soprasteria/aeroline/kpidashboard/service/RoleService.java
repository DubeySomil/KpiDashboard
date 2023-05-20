package com.soprasteria.aeroline.kpidashboard.service;

import java.util.List;
import com.soprasteria.aeroline.kpidashboard.payload.RoleDTO;

public interface RoleService {
    
    /* ****************************************CREATE*********************************************** */

    public void createRole(RoleDTO roleDetailsDTO);
   
    /* ****************************************READ*********************************************** */

    public RoleDTO getRole(int roleId);
    public List<RoleDTO> getAllRoles();

    /* ****************************************UPDATE*********************************************** */

    public void updateRole(int roleId, RoleDTO roleDetailsDTO);


    /* ****************************************DELETE*********************************************** */

    public void deleteRole(int roleId);

}

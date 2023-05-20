package com.soprasteria.aeroline.kpidashboard.service;

import java.util.HashMap;
import java.util.List;

import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectYearDTOUsePost;
import com.soprasteria.aeroline.kpidashboard.payload.KPIAll;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectDTOUse;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse2;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse4;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectYearDTOUse;

public interface ProjectService {
    
    /* ****************************************CREATE*********************************************** */

    public void createProject(String userName, ProjectDTOUse projectDTOUse);

    /* ****************************************READ*********************************************** */

    // public ProjectDTO getProject(int projectId);
    public ProjectDTO getProject(int projectId);
    public List<ProjectDTO> getAllProjects();
    public List<ProjectDTO>getProjectByUserName(String userName);
    public ProjectKPIUse getAllKpiByMonths(String projectName, String kpiName, int year);
    public ProjectKPIUse2 getAllKpiByMonths2(String projectName, int year);

    public List<ProjectDTO> getProjectbyAccess(String userName);

    public List<KPIAll> getDistinctKpis(List<Integer> projectIds); 

    public ProjectKPIUse4 getAllKpiByMonths3(List<Integer> projectIds, List<Integer> kpiIds, int year);



    /* ****************************************UPDATE*********************************************** */
    
    public void updateProject(int projectId, ProjectDTO projectDetailsDTO);
    public void updateProjectKPI(ProjectYearDTOUse projectYearDTOUse);
    public void updateProjectCustomKPI(CustomProjectYearDTOUsePost customProjectYearDTOUsePost);

    /* ****************************************DELETE*********************************************** */

    public void deleteProject(int projectId);

    public HashMap<String, Integer> getKpi(int projectId);

    public HashMap<String, Integer> getCustomKpi(int projectId);

    public ProjectDTO getProjectFromName(String projectName);
	

	
	




	



}

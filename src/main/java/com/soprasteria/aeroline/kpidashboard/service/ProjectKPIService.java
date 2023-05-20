package com.soprasteria.aeroline.kpidashboard.service;

import com.soprasteria.aeroline.kpidashboard.payload.KPIboth;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectYearDTOUse;

public interface ProjectKPIService {
    public ProjectYearDTOUse get(int projectId, int year);
    public KPIboth getAllKpis(String projectName);
}

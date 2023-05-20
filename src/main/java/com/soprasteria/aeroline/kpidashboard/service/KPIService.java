package com.soprasteria.aeroline.kpidashboard.service;

import java.util.List;
import com.soprasteria.aeroline.kpidashboard.payload.KPIDTO;

public interface KPIService {
    
    /* ****************************************CREATE*********************************************** */

    public void createKPI(KPIDTO kpiDetailsDTO);

    /* ****************************************READ*********************************************** */
   
    public KPIDTO getKPI(int kpiId);
    public List<KPIDTO> getAllKPIs();

    /* ****************************************DELETE*********************************************** */

    public void deleteKPI(int kpiId);

    /* ****************************************UPDATE*********************************************** */

    public void updateKPI(int kpiId, KPIDTO kpiDetailsDTO);
}

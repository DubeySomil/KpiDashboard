package com.soprasteria.aeroline.kpidashboard.service;

import java.util.List;

import com.soprasteria.aeroline.kpidashboard.payload.DUDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCenterDTO;

public interface ProfitCenterService {
    /* ****************************************READ*********************************************** */
   
    public ProfitCenterDTO getProfitCenter(int profitCenterId);
    public List<ProfitCenterDTO> getAllProfitCenters();
    public List<ProfitCenterDTO> getProfitCenterbyDu(String duName);
    public List<ProfitCenterDTO> getProfitCentersbyDu(List<String> dUs);

    public void postProfitCenter(ProfitCenterDTO profitCenterDTO);
}

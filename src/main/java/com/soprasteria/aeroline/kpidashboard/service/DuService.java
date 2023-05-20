package com.soprasteria.aeroline.kpidashboard.service;

import java.util.List;

import com.soprasteria.aeroline.kpidashboard.payload.DUDTO;

public interface DuService {
    /* ****************************************READ*********************************************** */
   
    public DUDTO getdu(int duId);
    public List<DUDTO> getAlldus();

    
    public void postdu(DUDTO dudto);
}

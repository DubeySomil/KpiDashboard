package com.soprasteria.aeroline.kpidashboard.service;

import java.util.List;
import com.soprasteria.aeroline.kpidashboard.payload.ClientDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCentersDTO;


public interface ClientService {
    /* ****************************************READ*********************************************** */
   
    public ClientDTO getClient(int clientId);
    public List<ClientDTO> getAllClients();
    public List<ClientDTO> getClientsbyProfitCenter(String profitCenterName);
    public List<ClientDTO> getClientsByProfitCenters(List<String> profitCenters);
    

    public void postClient(ClientDTO clientDTO);
}

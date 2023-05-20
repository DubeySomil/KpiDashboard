package com.soprasteria.aeroline.kpidashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.soprasteria.aeroline.kpidashboard.payload.ClientDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCentersDTO;
import com.soprasteria.aeroline.kpidashboard.service.ClientService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kpi/v7")
public class ClientController {

    @Autowired
    private ClientService clientService;

    // GET Client by their ID
    @GetMapping("/clients/{clientId}")
    public ClientDTO getClients(@PathVariable int clientId) {
        return this.clientService.getClient(clientId);
    }
        
    /* ****************************************************************************************************************************************** */

    // GET all Clients
    @GetMapping("/clients")
    public List<ClientDTO> get() {
        return this.clientService.getAllClients();
    }

    /* ****************************************************************************************************************************************** */

    // GET Client by Profit Center
    @GetMapping("/client/{profitCenterName}") 
    public List<ClientDTO> getClientbyProfitCenter(@PathVariable String profitCenterName) {
        return this.clientService.getClientsbyProfitCenter(profitCenterName);
    }

    /* ****************************************************************************************************************************************** */

    // GET Clients by Profit Centers
    @GetMapping("/clientsbyProfitCenters") 
    public List<ClientDTO> getClientsbyProfitCenters(@RequestParam List<String> profitCenters) {
        return this.clientService.getClientsByProfitCenters(profitCenters);
    }
    
    
    // Post Client
    @PostMapping("/") 
    public void create(@RequestBody ClientDTO clientDTO) {
        this.clientService.postClient(clientDTO);
    }

    
}

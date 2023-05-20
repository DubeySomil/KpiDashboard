package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soprasteria.aeroline.kpidashboard.dao.ClientRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProfitCenterRepository;
import com.soprasteria.aeroline.kpidashboard.entity.Client;
import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;
import com.soprasteria.aeroline.kpidashboard.payload.ClientDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCenterDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCentersDTO;
import com.soprasteria.aeroline.kpidashboard.service.ClientService;

@Service
public class ClientServiceImplementation implements ClientService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProfitCenterRepository profitCenterRepository;

    @Override
    public ClientDTO getClient(int clientId) {
        Optional<Client> findById = this.clientRepository.findById(clientId);
        return this.UsertoDTO(findById.get());
    }

    @Override
    public List<ClientDTO> getAllClients() {
        List<Client> findAll = this.clientRepository.findAll();
        List<ClientDTO> collect = findAll.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return collect;
    }

    @Override
    public List<ClientDTO> getClientsbyProfitCenter(String profitCenterName) {
        Optional<ProfitCenter> findByProfitCenterName = this.profitCenterRepository.findByProfitCenterName(profitCenterName);
        ProfitCenter profitCenter = findByProfitCenterName.get();
        List<Client> clients = profitCenter.getClients();
        List<ClientDTO> collect = clients.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return collect;
    }

    private ClientDTO UsertoDTO(Client client) {
        ClientDTO map = this.modelMapper.map(client, ClientDTO.class);
        return map;

    }

    private Client dtoToUser(ClientDTO clientDTO) {
        Client map = this.modelMapper.map(clientDTO, Client.class);
        return map;
    }

    @Override
    public void postClient(ClientDTO clientDTO) {
        Client dtoToUser = this.dtoToUser(clientDTO);
        this.clientRepository.save(dtoToUser);
    }

    @Override
    public List<ClientDTO> getClientsByProfitCenters(List<String> profitCenters) {
        List<Client> clients = new ArrayList<>();
        for(int i = 0; i < profitCenters.size(); i++) {
            String string = profitCenters.get(i);
            Optional<ProfitCenter> findByProfitCenterName = this.profitCenterRepository.findByProfitCenterName(string);
            ProfitCenter profitCenter = findByProfitCenterName.get();
            List<Client> clients2 = profitCenter.getClients();
            clients.addAll(clients2);
        }
        List<ClientDTO> collect = clients.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return collect;
    }
}

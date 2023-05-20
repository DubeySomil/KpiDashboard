package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soprasteria.aeroline.kpidashboard.dao.DURepository;
import com.soprasteria.aeroline.kpidashboard.entity.Du;
import com.soprasteria.aeroline.kpidashboard.payload.DUDTO;
import com.soprasteria.aeroline.kpidashboard.service.DuService;

@Service
public class DuServiceImplementation implements DuService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DURepository duRepository;

    @Override
    public DUDTO getdu(int duId) {
       Optional<Du> findById = this.duRepository.findById(duId);
       return this.UsertoDTO(findById.get());
    }

    @Override
    public List<DUDTO> getAlldus() {
        List<Du> findAll = this.duRepository.findAll();
        List<DUDTO> collect = findAll.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return collect;
    }

    

    private DUDTO UsertoDTO(Du du) {
        DUDTO map = this.modelMapper.map(du, DUDTO.class);
        return map;
    }

    private Du dtoToUser(DUDTO dudto) {
        Du map = this.modelMapper.map(dudto, Du.class);
        return map;
    }

    @Override
    public void postdu(DUDTO dudto) {
        Du dtoToUser = this.dtoToUser(dudto);
        this.duRepository.save(dtoToUser);
    }
    
}

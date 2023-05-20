package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soprasteria.aeroline.kpidashboard.dao.DURepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProfitCenterRepository;
import com.soprasteria.aeroline.kpidashboard.entity.Du;
import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;
import com.soprasteria.aeroline.kpidashboard.payload.DUDTO;
import com.soprasteria.aeroline.kpidashboard.payload.DUsDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCenterDTO;
import com.soprasteria.aeroline.kpidashboard.service.ProfitCenterService;

@Service
public class ProfitCenterImplementation implements ProfitCenterService{


    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProfitCenterRepository profitCenterRepository;

    @Autowired
    private DURepository duRepository;

    @Override
    public ProfitCenterDTO getProfitCenter(int profitCenterId) {
        Optional<ProfitCenter> findById = this.profitCenterRepository.findById(profitCenterId);
        return this.UsertoDTO(findById.get());
    }

    @Override
    public List<ProfitCenterDTO> getAllProfitCenters() {
        List<ProfitCenter> findAll = this.profitCenterRepository.findAll();
        List<ProfitCenterDTO> collect = findAll.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return collect;
    }

    private ProfitCenterDTO UsertoDTO(ProfitCenter profitCenter) {
        ProfitCenterDTO map = this.modelMapper.map(profitCenter, ProfitCenterDTO.class);
        return map;

    }

    private ProfitCenter dtoToUser(ProfitCenterDTO profitCenterDTO) {
        ProfitCenter map = this.modelMapper.map(profitCenterDTO, ProfitCenter.class);
        return map;
    }

    @Override
    public List<ProfitCenterDTO> getProfitCenterbyDu(String duName) {
        Optional<Du> findByDuName = this.duRepository.findByDuName(duName);
        Du du = findByDuName.get();
        List<ProfitCenter> profitCenters = du.getProfitCenters();
        List<ProfitCenterDTO> collect = profitCenters.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return collect;

    }

    @Override
    public void postProfitCenter(ProfitCenterDTO profitCenterDTO) {
        ProfitCenter dtoToUser = this.dtoToUser(profitCenterDTO);
        this.profitCenterRepository.save(dtoToUser);
    }

    @Override
    public List<ProfitCenterDTO> getProfitCentersbyDu(List<String> dUs) {
        List<ProfitCenter> profitCenters = new ArrayList<>();
        System.out.println("yo");
        for(int i = 0; i < dUs.size(); i++) {
            String string = dUs.get(i);
            System.out.println("rajat");
            Optional<Du> findByDuName = this.duRepository.findByDuName(string);
            Du du = findByDuName.get();
            System.out.println(du.getDuName());
            List<ProfitCenter> profitCenters1 = du.getProfitCenters();
            profitCenters.addAll(profitCenters1);
        }
        List<ProfitCenterDTO> collect = profitCenters.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return collect;
    }
     
}

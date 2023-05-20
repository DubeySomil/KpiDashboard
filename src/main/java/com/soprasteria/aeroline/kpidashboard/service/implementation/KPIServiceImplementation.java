package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.soprasteria.aeroline.kpidashboard.dao.KPIRepository;
import com.soprasteria.aeroline.kpidashboard.entity.KPI;
import com.soprasteria.aeroline.kpidashboard.exception.KpiNotFoundException;
import com.soprasteria.aeroline.kpidashboard.payload.KPIDTO;
import com.soprasteria.aeroline.kpidashboard.service.KPIService;

@Service
public class KPIServiceImplementation implements KPIService {

    @Autowired
    private KPIRepository kpiRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public KPIDTO getKPI(int kpiId) {
        Optional<KPI> findById = this.kpiRepository.findById(kpiId);
        if (findById == null) {
            throw new KpiNotFoundException("KPI", " KPIid ", kpiId);
        } else {
            KPI kpiDetails = findById.get();
            return this.UsertoDTO(kpiDetails);
        }
    }

    @Override
    public List<KPIDTO> getAllKPIs() {
        List<KPI> kpiDetails = this.kpiRepository.findAll();
        List<KPIDTO> kpiDetailsDTO = kpiDetails.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return kpiDetailsDTO;
    }

    @Override
    public void createKPI(KPIDTO kpiDetailsDTO) {
        KPI kpiDetails = this.dtoToUser(kpiDetailsDTO);
        this.kpiRepository.save(kpiDetails);

    }

    @Override
    public void deleteKPI(int kpiId) {
        Optional<KPI> findById = this.kpiRepository.findById(kpiId);
        if (findById == null) {
            throw new KpiNotFoundException("KPI", " KPIid ", kpiId);
        } else {
            this.kpiRepository.deleteById(kpiId);
        }

    }

    @Override
    public void updateKPI(int kpiId, KPIDTO kpiDetailsDTO) {
        Optional<KPI> findById = this.kpiRepository.findById(kpiId);
        KPI dtoToUser = this.dtoToUser(kpiDetailsDTO);
        if (findById == null) {
            throw new KpiNotFoundException("KPI", " KPIid ", kpiId);
        } else {
            KPI kpiDetails = findById.get();
            kpiDetails.setKpiName(dtoToUser.getKpiName());
            this.kpiRepository.save(kpiDetails);
        }

    }

    private KPIDTO UsertoDTO(KPI kpiDetails) {
        KPIDTO kpiDetailsDTO = this.modelMapper.map(kpiDetails, KPIDTO.class);
        return kpiDetailsDTO;

    }

    private KPI dtoToUser(KPIDTO kpiDetailsDTO) {
        KPI kpiDetails = this.modelMapper.map(kpiDetailsDTO, KPI.class);
        return kpiDetails;
    }

}

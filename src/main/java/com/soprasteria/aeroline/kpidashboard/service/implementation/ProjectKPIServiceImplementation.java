package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soprasteria.aeroline.kpidashboard.dao.CustomKPIRepository;
import com.soprasteria.aeroline.kpidashboard.dao.CustomProjectKPIYearMappingRepository;
import com.soprasteria.aeroline.kpidashboard.dao.KPIRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProjectKPIYearMappingRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProjectRepository;
import com.soprasteria.aeroline.kpidashboard.entity.CustomKPI;
import com.soprasteria.aeroline.kpidashboard.entity.CustomProjectKPIYearMapping;
import com.soprasteria.aeroline.kpidashboard.entity.KPI;
import com.soprasteria.aeroline.kpidashboard.entity.Project;
import com.soprasteria.aeroline.kpidashboard.entity.ProjectKPIYearMapping;
import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectKPIJusti;
import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectKPIYearMappingDTO;
import com.soprasteria.aeroline.kpidashboard.payload.KPIDTOmin;
import com.soprasteria.aeroline.kpidashboard.payload.KPIboth;
import com.soprasteria.aeroline.kpidashboard.payload.MonthDTO;
import com.soprasteria.aeroline.kpidashboard.payload.MonthJustiDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIYearJusti;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIYearMappingDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectYearDTOUse;
import com.soprasteria.aeroline.kpidashboard.service.ProjectKPIService;

@Service
public class ProjectKPIServiceImplementation implements ProjectKPIService{

    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private KPIRepository kpiRepository;

    @Autowired
    private CustomKPIRepository customKPIRepository;

    @Autowired
    private ProjectKPIYearMappingRepository projectKPIYearMappingRepository;

    @Autowired
    private CustomProjectKPIYearMappingRepository customProjectKPIYearMappingRepository;

    
    public ProjectYearDTOUse get(int projectId, int year) {
        List<Optional<ProjectKPIYearMapping>> findByProjectIdAndYear = this.projectKPIYearMappingRepository.findByProjectIdAndYear(projectId, year);
        List<Optional<CustomProjectKPIYearMapping>> findByProjectIdAndYear2 = this.customProjectKPIYearMappingRepository.findByProjectIdAndYear(projectId, year);
        ProjectYearDTOUse projectYearDTOUse = new ProjectYearDTOUse();
        List<ProjectKPIYearMappingDTO> kpis = new ArrayList<>();
        List<CustomProjectKPIYearMappingDTO> customKpis = new ArrayList<>();
        List<ProjectKPIYearJusti> justification = new ArrayList<>();
        List<CustomProjectKPIJusti> customJustification = new ArrayList<>();
        for(int i = 0; i < findByProjectIdAndYear.size(); i++) {
            Optional<ProjectKPIYearMapping> optional = findByProjectIdAndYear.get(i);
            ProjectKPIYearMapping projectKPIYearMapping = optional.get();
            projectYearDTOUse.setProjectId(projectKPIYearMapping.getProjectId());
            projectYearDTOUse.setYear(projectKPIYearMapping.getYear());
            ProjectKPIYearMappingDTO projectKPIYearMappingDTO = new ProjectKPIYearMappingDTO();
            MonthDTO monthDTO = new MonthDTO();
            monthDTO.setJanuary(projectKPIYearMapping.getJanuary());
            monthDTO.setFebruary(projectKPIYearMapping.getFebruary());
            monthDTO.setMarch(projectKPIYearMapping.getMarch());
            monthDTO.setApril(projectKPIYearMapping.getApril());
            monthDTO.setMay(projectKPIYearMapping.getMay());
            monthDTO.setJune(projectKPIYearMapping.getJune());
            monthDTO.setJuly(projectKPIYearMapping.getJuly());
            monthDTO.setAugust(projectKPIYearMapping.getAugust());
            monthDTO.setSeptember(projectKPIYearMapping.getSeptember());
            monthDTO.setOctober(projectKPIYearMapping.getOctober());
            monthDTO.setNovember(projectKPIYearMapping.getNovember());
            monthDTO.setDecember(projectKPIYearMapping.getDecember());
            projectKPIYearMappingDTO.setKpiId(projectKPIYearMapping.getKpiId());
            projectKPIYearMappingDTO.setKpiThreshold(projectKPIYearMapping.getKpiThreshold());
            projectKPIYearMappingDTO.setMonth(monthDTO);
            Optional<KPI> findById2 = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
            KPI kpi = findById2.get();
            projectKPIYearMappingDTO.setKpiName(kpi.getKpiName());
            kpis.add(projectKPIYearMappingDTO);
            projectYearDTOUse.setKpis(kpis);
            ProjectKPIYearJusti projectKPIYearJusti = new ProjectKPIYearJusti();
            MonthJustiDTO monthJustiDTO = new MonthJustiDTO();
            monthJustiDTO.setJanuaryJustification(projectKPIYearMapping.getJanuaryJustification());
            monthJustiDTO.setFebruaryJustification(projectKPIYearMapping.getFebruaryJustification());
            monthJustiDTO.setMarchJustification(projectKPIYearMapping.getMarchJustification());
            monthJustiDTO.setAprilJustification(projectKPIYearMapping.getAprilJustification());
            monthJustiDTO.setMayJustification(projectKPIYearMapping.getMayJustification());
            monthJustiDTO.setJuneJustification(projectKPIYearMapping.getJuneJustification());
            monthJustiDTO.setJulyJustification(projectKPIYearMapping.getJulyJustification());
            monthJustiDTO.setAugustJustification(projectKPIYearMapping.getAugustJustification());
            monthJustiDTO.setSeptemberJustification(projectKPIYearMapping.getSeptemberJustification());
            monthJustiDTO.setOctoberJustification(projectKPIYearMapping.getOctoberJustification());
            monthJustiDTO.setNovemberJustification(projectKPIYearMapping.getNovemberJustification());
            monthJustiDTO.setDecemberJustification(projectKPIYearMapping.getDecemberJustification());
            projectKPIYearJusti.setKpiId(projectKPIYearMapping.getKpiId());
            projectKPIYearJusti.setKpiThreshold(projectKPIYearMapping.getKpiThreshold());
            projectKPIYearJusti.setKpiName(kpi.getKpiName());
            projectKPIYearJusti.setMonthJustiDTO(monthJustiDTO);
            justification.add(projectKPIYearJusti);
            projectYearDTOUse.setJustification(justification);
        
        }
        for(int i = 0; i < findByProjectIdAndYear2.size(); i++) {
            Optional<CustomProjectKPIYearMapping> optional2 = findByProjectIdAndYear2.get(i);
            CustomProjectKPIYearMapping customProjectKPIYearMapping = optional2.get();

            CustomProjectKPIYearMappingDTO customProjectKPIYearMappingDTO = new CustomProjectKPIYearMappingDTO();
            MonthDTO monthDTO2 = new MonthDTO();
            monthDTO2.setJanuary(customProjectKPIYearMapping.getJanuary());
            monthDTO2.setFebruary(customProjectKPIYearMapping.getFebruary());
            monthDTO2.setMarch(customProjectKPIYearMapping.getMarch());
            monthDTO2.setApril(customProjectKPIYearMapping.getApril());
            monthDTO2.setMay(customProjectKPIYearMapping.getMay());
            monthDTO2.setJune(customProjectKPIYearMapping.getJune());
            monthDTO2.setJuly(customProjectKPIYearMapping.getJuly());
            monthDTO2.setAugust(customProjectKPIYearMapping.getAugust());
            monthDTO2.setSeptember(customProjectKPIYearMapping.getSeptember());
            monthDTO2.setOctober(customProjectKPIYearMapping.getOctober());
            monthDTO2.setNovember(customProjectKPIYearMapping.getNovember());
            monthDTO2.setDecember(customProjectKPIYearMapping.getDecember());
            customProjectKPIYearMappingDTO.setCustomKpiId(customProjectKPIYearMapping.getCustomKpiId());
            customProjectKPIYearMappingDTO.setCustomKpiThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
            customProjectKPIYearMappingDTO.setMonth(monthDTO2);
            Optional<CustomKPI> findById = this.customKPIRepository.findById(customProjectKPIYearMapping.getCustomKpiId());
            System.out.println(customProjectKPIYearMapping.toString());
            System.out.println("element is: " + findById.get());
            CustomKPI customKPI = findById.get();
            customProjectKPIYearMappingDTO.setCustomKpiId(customKPI.getCustomKpiId());
            customProjectKPIYearMappingDTO.setCustomKpiName(customKPI.getCustomKpiName());
            customProjectKPIYearMappingDTO.setCustomKpiThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
            customKpis.add(customProjectKPIYearMappingDTO);
            projectYearDTOUse.setCustomKpis(customKpis);

            CustomProjectKPIJusti customProjectKPIJusti = new CustomProjectKPIJusti();
            MonthJustiDTO monthJustiDTO2 = new MonthJustiDTO();
            monthJustiDTO2.setJanuaryJustification(customProjectKPIYearMapping.getJanuaryJustification());
            monthJustiDTO2.setFebruaryJustification(customProjectKPIYearMapping.getFebruaryJustification());
            monthJustiDTO2.setMarchJustification(customProjectKPIYearMapping.getMarchJustification());
            monthJustiDTO2.setAprilJustification(customProjectKPIYearMapping.getAprilJustification());
            monthJustiDTO2.setMayJustification(customProjectKPIYearMapping.getMayJustification());
            monthJustiDTO2.setJuneJustification(customProjectKPIYearMapping.getJuneJustification());
            monthJustiDTO2.setJulyJustification(customProjectKPIYearMapping.getJulyJustification());
            monthJustiDTO2.setAugustJustification(customProjectKPIYearMapping.getAugustJustification());
            monthJustiDTO2.setSeptemberJustification(customProjectKPIYearMapping.getSeptemberJustification());
            monthJustiDTO2.setOctoberJustification(customProjectKPIYearMapping.getOctoberJustification());
            monthJustiDTO2.setNovemberJustification(customProjectKPIYearMapping.getNovemberJustification());
            monthJustiDTO2.setDecemberJustification(customProjectKPIYearMapping.getDecemberJustification());
            customProjectKPIJusti.setMonthJustiDTO(monthJustiDTO2);
            customProjectKPIJusti.setCustomKpiId(customKPI.getCustomKpiId());
            customProjectKPIJusti.setCustomKpiName(customKPI.getCustomKpiName());
            customProjectKPIJusti.setCustomKpiThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
            customJustification.add(customProjectKPIJusti);
            projectYearDTOUse.setCustomJustification(customJustification);
        }
        return projectYearDTOUse;
    }


    @Override
    public KPIboth getAllKpis(String projectName) {
        Optional<Project> findById = this.projectRepository.findByProjectName(projectName);
        Project project = findById.get();
        List<KPI> kpiList = project.getKpiList();
        List<CustomKPI> customKpiList = project.getCustomKpiList();
        KPIboth kpIboth = new KPIboth();
        
        List<KPIDTOmin> kpis = new ArrayList<>();
        for(int i = 0; i < kpiList.size(); i++) {
            KPI kpi = kpiList.get(i);
            KPIDTOmin kpidto = new KPIDTOmin();
            kpidto.setKpiName(kpi.getKpiName());
            kpis.add(kpidto);
        }

        for(int i = 0; i < customKpiList.size(); i++) {
            CustomKPI customKPI = customKpiList.get(i);
            KPIDTOmin kpidto = new KPIDTOmin();
            kpidto.setKpiName(customKPI.getCustomKpiName());
            kpis.add(kpidto);
        }

        kpIboth.setKpis(kpis);
        return kpIboth;
    }
    
}

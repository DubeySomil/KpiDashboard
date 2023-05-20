package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.soprasteria.aeroline.kpidashboard.entity.KPI;

public interface KPIRepository extends JpaRepository<KPI, Integer>{
    public Optional<KPI> findByKpiName(String kpiName);
}

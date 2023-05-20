package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.soprasteria.aeroline.kpidashboard.entity.CustomKPI;

public interface CustomKPIRepository extends JpaRepository<CustomKPI, Integer>{
    public Optional<CustomKPI> findByCustomKpiName(String customKpiName);
}

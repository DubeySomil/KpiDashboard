package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;

public interface ProfitCenterRepository extends JpaRepository<ProfitCenter, Integer>{
    public Optional<ProfitCenter> findByProfitCenterName(String profitCenterName);
}

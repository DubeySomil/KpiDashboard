package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soprasteria.aeroline.kpidashboard.entity.Du;


public interface DURepository extends JpaRepository<Du, Integer>{
    public Optional<Du> findByDuName(String duName);
}

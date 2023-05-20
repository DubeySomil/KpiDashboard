package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soprasteria.aeroline.kpidashboard.entity.Client;



public interface ClientRepository extends JpaRepository<Client, Integer>{
    public Optional<Client> findByClientName(String clientName);
}

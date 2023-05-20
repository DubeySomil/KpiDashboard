package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soprasteria.aeroline.kpidashboard.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{
    public Optional<Role> findByRoleName(String roleName);
}

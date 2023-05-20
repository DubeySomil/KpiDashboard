package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.soprasteria.aeroline.kpidashboard.entity.Role;
import com.soprasteria.aeroline.kpidashboard.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    public Optional<User> findByUserName(String userName);
    public Optional<User> findByUserNameAndUserPassword(String userName, String userPassword);
    public List<User> findByRole(Role role);
    public Optional<User> findByUserEmail(String userEmail);
}

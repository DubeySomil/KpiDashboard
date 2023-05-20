package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.soprasteria.aeroline.kpidashboard.dao.RoleRepository;
import com.soprasteria.aeroline.kpidashboard.entity.Role;
import com.soprasteria.aeroline.kpidashboard.exception.RoleNotFoundException;
import com.soprasteria.aeroline.kpidashboard.payload.RoleDTO;
import com.soprasteria.aeroline.kpidashboard.service.RoleService;

@Service
public class RoleServiceImplementation implements RoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public RoleDTO getRole(int roleId) {
        Optional<Role> findById = this.roleRepository.findById(roleId);
        if (findById == null) {
            throw new RoleNotFoundException("Role", " rolename ", roleId);
        } else {
            Role roleDetails = findById.get();
            return this.UsertoDTO(roleDetails);
        }
    }

    @Override
    public List<RoleDTO> getAllRoles() {
        List<Role> roleDetails = this.roleRepository.findAll();
        List<RoleDTO> roleDetailsDTO = roleDetails.stream().map(user -> this.UsertoDTO(user)).collect(Collectors.toList());
        return roleDetailsDTO;
    }

    @Override
    public void createRole(RoleDTO roleDetailsDTO) {
        Role roleDetails = this.dtoToUser(roleDetailsDTO);
        this.roleRepository.save(roleDetails);
        
    }

    @Override
    public void deleteRole(int roleId) {
        Optional<Role> findById = this.roleRepository.findById(roleId);
        if(findById == null) {
            throw new RoleNotFoundException("Role", " rolename ", roleId);
        } else {
            this.roleRepository.deleteById(roleId);
        }
        
    }

    @Override
    public void updateRole(int roleId, RoleDTO roleDetailsDTO) {
        Optional<Role> findById = this.roleRepository.findById(roleId);
        Role dtoToUser = this.dtoToUser(roleDetailsDTO);
        if(findById == null) {
            throw new RoleNotFoundException("Project", " projectname ", roleId);
        } else {
            Role roleDetails = findById.get();
            roleDetails.setRoleName(dtoToUser.getRoleName());
            this.roleRepository.save(roleDetails);
        }
        
    }

    private RoleDTO UsertoDTO(Role roleDetails) {
        RoleDTO roleDetailsDTO = this.modelMapper.map(roleDetails, RoleDTO.class);
        return roleDetailsDTO;

    }
    

    private Role dtoToUser(RoleDTO roleDetailsDTO) {
        Role roleDetails = this.modelMapper.map(roleDetailsDTO, Role.class);
        return roleDetails;
    }
    
}

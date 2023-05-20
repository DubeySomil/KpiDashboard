package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.soprasteria.aeroline.kpidashboard.entity.ProjectKPIMapping;

public interface ProjectKPIMappingRepository extends JpaRepository<ProjectKPIMapping, Integer>{
    
	@Query(value="select * from projectkpimapping  where project_id = :projectId",nativeQuery = true)
	public List<ProjectKPIMapping> getprojectKpi(@Param("projectId") int projectId);

	@Query(value = "SELECT DISTINCT kpi_id FROM projectkpimapping WHERE project_id in(:projectIds)", nativeQuery = true)
    List<Integer> findDistinctKpiIdsByProjectIds(@Param("projectIds") List<Integer> projectIds);
}

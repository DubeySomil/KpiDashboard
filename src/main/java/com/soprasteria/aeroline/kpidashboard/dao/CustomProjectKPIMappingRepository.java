package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.soprasteria.aeroline.kpidashboard.entity.CustomProjectKPIMapping;

public interface CustomProjectKPIMappingRepository extends JpaRepository<CustomProjectKPIMapping, Integer>{

	@Query(value="select * from custom_projectkpimapping where custom_project_Id = :projectId",nativeQuery = true)
	public List<CustomProjectKPIMapping> getprojectCustomKpi(@Param("projectId") int projectId);

	@Query(value = "SELECT DISTINCT custom_kpi_id FROM kpi_dashboard.custom_projectkpimapping WHERE custom_project_id in(:customProjectIds)", nativeQuery = true)
    List<Integer> findDistinctCustomKpiIdsByCustomProjectIds(@Param("customProjectIds") List<Integer> customProjectIds);
    
}

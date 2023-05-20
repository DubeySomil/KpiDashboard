package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.soprasteria.aeroline.kpidashboard.entity.ProjectKPIYearMapping;

public interface ProjectKPIYearMappingRepository extends JpaRepository<ProjectKPIYearMapping, Integer> {
    public List<Optional<ProjectKPIYearMapping>> findByProjectIdAndYear(int projectId, int year);

    public List<Optional<ProjectKPIYearMapping>> findByProjectId(int projectId);

    public List<Optional<ProjectKPIYearMapping>> findByYear(int year);

    public Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear(int projectId, int kpiId, int year);

    @Query(value = "SELECT * FROM kpi_dashboard.projectkpiyear_mapping WHERE project_id in (:projectIds) AND kpi_id in (:kpiIds) AND year = :year", nativeQuery = true)
    List<ProjectKPIYearMapping> findByProjectIdsAndKpiIdsAndYear(@Param("projectIds") List<Integer> projectIds,
            @Param("kpiIds") List<Integer> kpiIds,
            @Param("year") Integer year);
}

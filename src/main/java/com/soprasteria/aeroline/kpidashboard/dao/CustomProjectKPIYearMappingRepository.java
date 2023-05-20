package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.soprasteria.aeroline.kpidashboard.entity.CustomProjectKPIYearMapping;

public interface CustomProjectKPIYearMappingRepository extends JpaRepository<CustomProjectKPIYearMapping, Integer>{
    public List<Optional<CustomProjectKPIYearMapping>> findByProjectIdAndYear(int projectId, int year);
    public List<Optional<CustomProjectKPIYearMapping>> findByProjectId(int projectId);
    public List<Optional<CustomProjectKPIYearMapping>> findByYear(int year);
    public List<Optional<CustomProjectKPIYearMapping>> findByCustomKpiId(int customKpiId);
    public Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear(int projectId, int customKpiId, int year);
}

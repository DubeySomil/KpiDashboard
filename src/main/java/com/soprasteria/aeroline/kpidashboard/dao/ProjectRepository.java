package com.soprasteria.aeroline.kpidashboard.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.soprasteria.aeroline.kpidashboard.entity.Client;
import com.soprasteria.aeroline.kpidashboard.entity.Du;
import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;
import com.soprasteria.aeroline.kpidashboard.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
	public Optional<Project> findByProjectName(String projectName);

	public List<Optional<Project>> findByProjectDU(Du projectDU);

	public List<Optional<Project>> findByProjectProfitCenter(ProfitCenter projeectProfitCenter);

	public List<Optional<Project>> findByProjectClient(Client projectClient);

//	public List<Optional<Project>> findByProjectDUAndProjectProfitCenterAndProjectClient(Du projectDU,
//			ProfitCenter projeectProfitCenter, Client projectClient);

	@Query("SELECT p FROM Project p " + "WHERE p.projectDU.duId IN :duIds "
			+ "AND p.projectProfitCenter.profitCenterId IN :profitCenterIds "
			+ "AND p.projectClient.clientId IN :clientIds")
	public List<Optional<Project>> findByProjectDUAndProjectProfitCenterAndProjectClient(@Param("duIds") List<Integer> duIds,
			@Param("profitCenterIds") List<Integer> profitCenterIds, @Param("clientIds") List<Integer> clientIds);

}

package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soprasteria.aeroline.kpidashboard.dao.ClientRepository;
import com.soprasteria.aeroline.kpidashboard.dao.CustomKPIRepository;
import com.soprasteria.aeroline.kpidashboard.dao.CustomProjectKPIMappingRepository;
import com.soprasteria.aeroline.kpidashboard.dao.CustomProjectKPIYearMappingRepository;
import com.soprasteria.aeroline.kpidashboard.dao.DURepository;
import com.soprasteria.aeroline.kpidashboard.dao.KPIRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProfitCenterRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProjectKPIMappingRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProjectKPIYearMappingRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProjectRepository;
import com.soprasteria.aeroline.kpidashboard.dao.UserRepository;
import com.soprasteria.aeroline.kpidashboard.entity.Client;
import com.soprasteria.aeroline.kpidashboard.entity.CustomKPI;
import com.soprasteria.aeroline.kpidashboard.entity.CustomProjectKPIMapping;
import com.soprasteria.aeroline.kpidashboard.entity.CustomProjectKPIYearMapping;
import com.soprasteria.aeroline.kpidashboard.entity.Du;
import com.soprasteria.aeroline.kpidashboard.entity.KPI;
import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;
import com.soprasteria.aeroline.kpidashboard.entity.Project;
import com.soprasteria.aeroline.kpidashboard.entity.ProjectKPIMapping;
import com.soprasteria.aeroline.kpidashboard.entity.ProjectKPIYearMapping;
import com.soprasteria.aeroline.kpidashboard.entity.User;
import com.soprasteria.aeroline.kpidashboard.exception.KpiNotFoundException;
import com.soprasteria.aeroline.kpidashboard.exception.ProjectNotFoundException;
import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectKPIJusti;
import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectKPIMappingDTO;
import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectKPIYearMappingDTO;
import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectKPIYearMappingDTOPost;
import com.soprasteria.aeroline.kpidashboard.payload.CustomProjectYearDTOUsePost;
import com.soprasteria.aeroline.kpidashboard.payload.KPIAll;
import com.soprasteria.aeroline.kpidashboard.payload.KPIUse;
import com.soprasteria.aeroline.kpidashboard.payload.KPIUse2;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectDTOUse;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIMappingDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse2;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIUse4;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIYearJusti;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectKPIYearMappingDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProjectYearDTOUse;
import com.soprasteria.aeroline.kpidashboard.service.ProjectService;

@Service
public class ProjectServiceImplementation implements ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private KPIRepository kpiRepository;

	@Autowired
	private CustomKPIRepository customKPIRepository;

	@Autowired
	private ProjectKPIMappingRepository projectKPIMappingRepository;

	@Autowired
	private CustomProjectKPIMappingRepository customProjectKPIMappingRepository;

	@Autowired
	private ProjectKPIYearMappingRepository projectKPIYearMappingRepository;

	@Autowired
	private CustomProjectKPIYearMappingRepository customProjectKPIYearMappingRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DURepository duRepository;

	@Autowired
	private ProfitCenterRepository profitCenterRepository;

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ProjectDTO getProject(int projectId) {
		Optional<Project> findById = this.projectRepository.findById(projectId);
		if (findById == null) {
			throw new ProjectNotFoundException("Project", " projectid ", projectId);
		} else {
			Project project = findById.get();
			return this.UsertoDTO(project);
		}
	}

	@Override
	public List<ProjectDTO> getAllProjects() {
		List<Project> projectDetails = this.projectRepository.findAll();
		List<ProjectDTO> projectDetailsDTO = projectDetails.stream().map(user -> this.UsertoDTO(user))
				.collect(Collectors.toList());
		return projectDetailsDTO;
	}

	public void createProject(String userName, ProjectDTOUse projectDTOUse) {
		Project project = this.dtoToUser(projectDTOUse);
		Optional<User> findByUserName2 = this.userRepository.findByUserName(userName);
		User user = findByUserName2.get();
		String string = "";
		String userFirstName = user.getUserFirstName();
		String userLastName = user.getUserLastName();
		string = userFirstName + " " + userLastName;
		project.setProjectManager(string);

		// DU
		Optional<Du> findByDuName = this.duRepository.findByDuName(projectDTOUse.getProjectDU());
		Du du = findByDuName.get();
		project.setProjectDU(du);

		// Profit Center

		Optional<ProfitCenter> findByProfitCenterName = this.profitCenterRepository
				.findByProfitCenterName(projectDTOUse.getProjectProfitCenter());
		ProfitCenter profitCenter = findByProfitCenterName.get();
		project.setProjectProfitCenter(profitCenter);

		// Client

		Optional<Client> findByClientName = this.clientRepository.findByClientName(projectDTOUse.getProjectClient());
		Client client = findByClientName.get();
		project.setProjectClient(client);

		Project save = this.projectRepository.save(project);

		Optional<Project> findProjectById = this.projectRepository.findById(save.getProjectID());
		Optional<User> findByUserName = this.userRepository.findByUserName(userName);
		Project projectDetails = findProjectById.get();
		User userDetails = findByUserName.get();
		List<Project> projects = userDetails.getProjects();
		projects.add(projectDetails);
		userDetails.setProjects(projects);
		this.userRepository.save(userDetails);

		List<ProjectKPIMappingDTO> kpis = projectDTOUse.getKpis();
		List<CustomProjectKPIMappingDTO> customKpis = projectDTOUse.getCustomKpis();

		ArrayList<KPI> arrayList = new ArrayList<>();
		ArrayList<CustomKPI> arrayList2 = new ArrayList<>();
		for (int i = 0; i < kpis.size(); i++) {
			ProjectKPIMappingDTO projectKPIMappingDTO = kpis.get(i);

			ProjectKPIMapping projectKPIMapping = new ProjectKPIMapping();
			projectKPIMapping.setProjectId(save.getProjectID());
			projectKPIMapping.setKpiId(projectKPIMappingDTO.getKpiId());
			projectKPIMapping.setKpiThreshold(projectKPIMappingDTO.getKpiThreshold());
			this.projectKPIMappingRepository.save(projectKPIMapping);

			int year = LocalDate.now().getYear();
			for (int y = year; y > year - 5; y--) {
				ProjectKPIYearMapping projectKPIYearMapping = new ProjectKPIYearMapping();
				projectKPIYearMapping.setKpiId(projectKPIMappingDTO.getKpiId());
				projectKPIYearMapping.setKpiThreshold(projectKPIMappingDTO.getKpiThreshold());
				projectKPIYearMapping.setProjectId(save.getProjectID());
				projectKPIYearMapping.setYear(y);
				this.projectKPIYearMappingRepository.save(projectKPIYearMapping);
			}

			Optional<KPI> findById = this.kpiRepository.findById(projectKPIMapping.getKpiId());
			if (!findById.isPresent()) {
				throw new KpiNotFoundException("KPI", " KPIid ", projectKPIMapping.getKpiId());
			} else {
				KPI kpi = findById.get();
				arrayList.add(kpi);
			}

		}
		for (int i = 0; i < customKpis.size(); i++) {
			CustomProjectKPIMappingDTO customProjectKPIMappingDTO = customKpis.get(i);
			CustomKPI customKPI = new CustomKPI();
			customKPI.setCustomKpiName(customProjectKPIMappingDTO.getCustomKpiName());
			CustomKPI save2 = this.customKPIRepository.save(customKPI);

			CustomProjectKPIMapping dtoToUser = this.dtoToUser(customProjectKPIMappingDTO);
			dtoToUser.setCustomProjectId(save.getProjectID());
			dtoToUser.setCustomKpiId(save2.getCustomKpiId());
			this.customProjectKPIMappingRepository.save(dtoToUser);

			int year = LocalDate.now().getYear();
			for (int y = year; y > year - 5; y--) {
				CustomProjectKPIYearMapping customProjectKPIYearMapping = new CustomProjectKPIYearMapping();
				Optional<CustomKPI> findByCustomKpiName = this.customKPIRepository.findById(save2.getCustomKpiId());
				CustomKPI customKPI2 = findByCustomKpiName.get();
				customProjectKPIYearMapping.setCustomKpiId(customKPI2.getCustomKpiId());
				customProjectKPIYearMapping.setCustomKpiThreshold(customProjectKPIMappingDTO.getCustomKpiThreshold());
				customProjectKPIYearMapping.setProjectId(save.getProjectID());
				customProjectKPIYearMapping.setYear(y);
				this.customProjectKPIYearMappingRepository.save(customProjectKPIYearMapping);
			}
			arrayList2.add(customKPI);
		}
		project.setKpiList(arrayList);
		project.setCustomKpiList(arrayList2);
		this.projectRepository.save(project);

	}

	@Override
	public void deleteProject(int projectId) {
		Optional<Project> findById = this.projectRepository.findById(projectId);
		if (findById == null) {
			throw new ProjectNotFoundException("Project", " projectid ", projectId);
		} else {
			int projectID2 = findById.get().getProjectID();
			this.projectRepository.deleteById(projectID2);
		}

	}

	@Override
	public void updateProject(int projectId, ProjectDTO projectDetailsDTO) {
		Optional<Project> findById = this.projectRepository.findById(projectId);
		Project dtoToUser = this.dtoToUser(projectDetailsDTO);
		if (findById == null) {
			throw new ProjectNotFoundException("Project", " projectid ", projectId);
		} else {
			Project projectDetails = findById.get();
			projectDetails.setProjectName(dtoToUser.getProjectName());
			projectDetails.setProjectType(dtoToUser.getProjectType());
			projectDetails.setProjectID(dtoToUser.getProjectID());
			this.projectRepository.save(projectDetails);
		}

	}

	private ProjectDTO UsertoDTO(Project projectDetails) {
		ProjectDTO projectDetailsDTO = this.modelMapper.map(projectDetails, ProjectDTO.class);
		return projectDetailsDTO;

	}

	private Project dtoToUser(ProjectDTO projectDetailsDTO) {
		Project projectDetails = this.modelMapper.map(projectDetailsDTO, Project.class);
		return projectDetails;
	}

	private Project dtoToUser(ProjectDTOUse projectDTOUse) {
		Project map = this.modelMapper.map(projectDTOUse, Project.class);
		return map;
	}

	private CustomProjectKPIMapping dtoToUser(CustomProjectKPIMappingDTO customProjectKPIMappingDTO) {
		CustomProjectKPIMapping map = this.modelMapper.map(customProjectKPIMappingDTO, CustomProjectKPIMapping.class);
		return map;
	}

	@Override
	public HashMap<String, Integer> getCustomKpi(int projectId) {
		List<CustomProjectKPIMapping> l1 = this.customProjectKPIMappingRepository.getprojectCustomKpi(projectId);
		HashMap<String, Integer> hash_map = new HashMap<String, Integer>();
		for (int i = 0; i < l1.size(); i++) {
			CustomProjectKPIMapping a1 = l1.get(i);
			CustomKPI customkpi = this.customKPIRepository.findById(a1.getCustomKpiId()).orElseThrow();
			String customKpiName = customkpi.getCustomKpiName();
			int threshold = a1.getCustomKpiThreshold();
			hash_map.put(customKpiName, threshold);

		}
		return hash_map;
	}

	@Override
	public ProjectDTO getProjectFromName(String projectName) {
		Project p = this.projectRepository.findByProjectName(projectName).orElseThrow();

		return this.modelMapper.map(p, ProjectDTO.class);
	}

	@Override
	public void updateProjectKPI(ProjectYearDTOUse projectYearDTOUse) {
		List<Optional<ProjectKPIYearMapping>> findByProjectIdAndYear1 = this.projectKPIYearMappingRepository
				.findByProjectIdAndYear(projectYearDTOUse.getProjectId(), projectYearDTOUse.getYear());
		List<Optional<CustomProjectKPIYearMapping>> findByProjectIdAndYear2 = this.customProjectKPIYearMappingRepository
				.findByProjectIdAndYear(projectYearDTOUse.getProjectId(), projectYearDTOUse.getYear());

		List<ProjectKPIYearMappingDTO> kpis = projectYearDTOUse.getKpis();
		List<CustomProjectKPIYearMappingDTO> customKpis = projectYearDTOUse.getCustomKpis();
		List<ProjectKPIYearJusti> justification = projectYearDTOUse.getJustification();
		List<CustomProjectKPIJusti> customJustification = projectYearDTOUse.getCustomJustification();

		for (int i = 0; i < findByProjectIdAndYear1.size(); i++) {
			Optional<ProjectKPIYearMapping> optional = findByProjectIdAndYear1.get(i);
			ProjectKPIYearMapping projectKPIYearMapping = optional.get();
			projectKPIYearMapping.setJanuary(kpis.get(i).getMonth().getJanuary());
			projectKPIYearMapping.setFebruary(kpis.get(i).getMonth().getFebruary());
			projectKPIYearMapping.setMarch(kpis.get(i).getMonth().getMarch());
			projectKPIYearMapping.setApril(kpis.get(i).getMonth().getApril());
			projectKPIYearMapping.setMay(kpis.get(i).getMonth().getMay());
			projectKPIYearMapping.setJune(kpis.get(i).getMonth().getJune());
			projectKPIYearMapping.setJuly(kpis.get(i).getMonth().getJuly());
			projectKPIYearMapping.setAugust(kpis.get(i).getMonth().getAugust());
			projectKPIYearMapping.setSeptember(kpis.get(i).getMonth().getSeptember());
			projectKPIYearMapping.setOctober(kpis.get(i).getMonth().getOctober());
			projectKPIYearMapping.setNovember(kpis.get(i).getMonth().getNovember());
			projectKPIYearMapping.setDecember(kpis.get(i).getMonth().getDecember());

			projectKPIYearMapping
					.setJanuaryJustification(justification.get(i).getMonthJustiDTO().getJanuaryJustification());
			projectKPIYearMapping
					.setFebruaryJustification(justification.get(i).getMonthJustiDTO().getFebruaryJustification());
			projectKPIYearMapping
					.setMarchJustification(justification.get(i).getMonthJustiDTO().getMarchJustification());
			projectKPIYearMapping
					.setAprilJustification(justification.get(i).getMonthJustiDTO().getAprilJustification());
			projectKPIYearMapping.setMayJustification(justification.get(i).getMonthJustiDTO().getMayJustification());
			projectKPIYearMapping.setJuneJustification(justification.get(i).getMonthJustiDTO().getJuneJustification());
			projectKPIYearMapping.setJulyJustification(justification.get(i).getMonthJustiDTO().getJulyJustification());
			projectKPIYearMapping
					.setAugustJustification(justification.get(i).getMonthJustiDTO().getAugustJustification());
			projectKPIYearMapping
					.setSeptemberJustification(justification.get(i).getMonthJustiDTO().getSeptemberJustification());
			projectKPIYearMapping
					.setOctoberJustification(justification.get(i).getMonthJustiDTO().getOctoberJustification());
			projectKPIYearMapping
					.setNovemberJustification(justification.get(i).getMonthJustiDTO().getNovemberJustification());
			projectKPIYearMapping
					.setDecemberJustification(justification.get(i).getMonthJustiDTO().getDecemberJustification());

			this.projectKPIYearMappingRepository.save(projectKPIYearMapping);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			Optional<CustomProjectKPIYearMapping> optional = findByProjectIdAndYear2.get(i);
			CustomProjectKPIYearMapping customProjectKPIYearMapping = optional.get();
			customProjectKPIYearMapping.setJanuary(customKpis.get(i).getMonth().getJanuary());
			customProjectKPIYearMapping.setFebruary(customKpis.get(i).getMonth().getFebruary());
			customProjectKPIYearMapping.setMarch(customKpis.get(i).getMonth().getMarch());
			customProjectKPIYearMapping.setApril(customKpis.get(i).getMonth().getApril());
			customProjectKPIYearMapping.setMay(customKpis.get(i).getMonth().getMay());
			customProjectKPIYearMapping.setJune(customKpis.get(i).getMonth().getJune());
			customProjectKPIYearMapping.setJuly(customKpis.get(i).getMonth().getJuly());
			customProjectKPIYearMapping.setAugust(customKpis.get(i).getMonth().getAugust());
			customProjectKPIYearMapping.setSeptember(customKpis.get(i).getMonth().getSeptember());
			customProjectKPIYearMapping.setOctober(customKpis.get(i).getMonth().getOctober());
			customProjectKPIYearMapping.setNovember(customKpis.get(i).getMonth().getNovember());
			customProjectKPIYearMapping.setDecember(customKpis.get(i).getMonth().getDecember());

			customProjectKPIYearMapping
					.setJanuaryJustification(customJustification.get(i).getMonthJustiDTO().getJanuaryJustification());
			customProjectKPIYearMapping
					.setFebruaryJustification(customJustification.get(i).getMonthJustiDTO().getFebruaryJustification());
			customProjectKPIYearMapping
					.setMarchJustification(customJustification.get(i).getMonthJustiDTO().getMarchJustification());
			customProjectKPIYearMapping
					.setAprilJustification(customJustification.get(i).getMonthJustiDTO().getAprilJustification());
			customProjectKPIYearMapping
					.setMayJustification(customJustification.get(i).getMonthJustiDTO().getMayJustification());
			customProjectKPIYearMapping
					.setJuneJustification(customJustification.get(i).getMonthJustiDTO().getJuneJustification());
			customProjectKPIYearMapping
					.setJulyJustification(customJustification.get(i).getMonthJustiDTO().getJulyJustification());
			customProjectKPIYearMapping
					.setAugustJustification(customJustification.get(i).getMonthJustiDTO().getAugustJustification());
			customProjectKPIYearMapping.setSeptemberJustification(
					customJustification.get(i).getMonthJustiDTO().getSeptemberJustification());
			customProjectKPIYearMapping
					.setOctoberJustification(customJustification.get(i).getMonthJustiDTO().getOctoberJustification());
			customProjectKPIYearMapping
					.setNovemberJustification(customJustification.get(i).getMonthJustiDTO().getNovemberJustification());
			customProjectKPIYearMapping
					.setDecemberJustification(customJustification.get(i).getMonthJustiDTO().getDecemberJustification());

			this.customProjectKPIYearMappingRepository.save(customProjectKPIYearMapping);
		}

	}

	@Override
	public HashMap<String, Integer> getKpi(int projectId) {
		List<ProjectKPIMapping> l1 = this.projectKPIMappingRepository.getprojectKpi(projectId);
		HashMap<String, Integer> hash_map = new HashMap<String, Integer>();
		for (int i = 0; i < l1.size(); i++) {
			ProjectKPIMapping a1 = l1.get(i);
			KPI kpi = this.kpiRepository.findById(a1.getKpiId()).orElseThrow();
			String kpi_name = kpi.getKpiName();
			int threshold = a1.getKpiThreshold();
			hash_map.put(kpi_name, threshold);
		}
		return hash_map;

	}

	@Override
	public List<ProjectDTO> getProjectByUserName(String userName) {
		Optional<User> findByUserName = this.userRepository.findByUserName(userName);
		User user = findByUserName.get();
		List<Project> projects = user.getProjects();
		ArrayList<ProjectDTO> arrayList = new ArrayList<>();
		for (int i = 0; i < projects.size(); i++) {
			Project project = projects.get(i);
			ProjectDTO usertoDTO = this.UsertoDTO(project);
			arrayList.add(usertoDTO);
		}
		return arrayList;
	}

	@Override
	public void updateProjectCustomKPI(CustomProjectYearDTOUsePost customProjectYearDTOUsePost) {
		List<Optional<CustomProjectKPIYearMapping>> findByProjectIdAndYear = this.customProjectKPIYearMappingRepository
				.findByProjectIdAndYear(customProjectYearDTOUsePost.getProjectId(),
						customProjectYearDTOUsePost.getYear());
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			Optional<CustomProjectKPIYearMapping> optional = findByProjectIdAndYear.get(i);
			CustomProjectKPIYearMapping customProjectKPIYearMapping = optional.get();

			List<CustomProjectKPIYearMappingDTOPost> customKpis = customProjectYearDTOUsePost.getCustomKpis();

			CustomProjectKPIYearMappingDTOPost customProjectKPIYearMappingDTOPost = customKpis.get(i);
			if (customProjectKPIYearMappingDTOPost.getJanuary() != -1)
				customProjectKPIYearMapping.setJanuary(customProjectKPIYearMappingDTOPost.getJanuary());
			if (customProjectKPIYearMappingDTOPost.getFebruary() != -1)
				customProjectKPIYearMapping.setFebruary(customProjectKPIYearMappingDTOPost.getFebruary());
			if (customProjectKPIYearMappingDTOPost.getMarch() != -1)
				customProjectKPIYearMapping.setMarch(customProjectKPIYearMappingDTOPost.getMarch());
			if (customProjectKPIYearMappingDTOPost.getApril() != -1)
				customProjectKPIYearMapping.setApril(customProjectKPIYearMappingDTOPost.getApril());
			if (customProjectKPIYearMappingDTOPost.getMay() != -1)
				customProjectKPIYearMapping.setMay(customProjectKPIYearMappingDTOPost.getMay());
			if (customProjectKPIYearMappingDTOPost.getJune() != -1)
				customProjectKPIYearMapping.setJune(customProjectKPIYearMappingDTOPost.getJune());
			if (customProjectKPIYearMappingDTOPost.getJuly() != -1)
				customProjectKPIYearMapping.setJuly(customProjectKPIYearMappingDTOPost.getJuly());
			if (customProjectKPIYearMappingDTOPost.getAugust() != -1)
				customProjectKPIYearMapping.setAugust(customProjectKPIYearMappingDTOPost.getAugust());
			if (customProjectKPIYearMappingDTOPost.getSeptember() != -1)
				customProjectKPIYearMapping.setSeptember(customProjectKPIYearMappingDTOPost.getSeptember());
			if (customProjectKPIYearMappingDTOPost.getOctober() != -1)
				customProjectKPIYearMapping.setOctober(customProjectKPIYearMappingDTOPost.getOctober());
			if (customProjectKPIYearMappingDTOPost.getNovember() != -1)
				customProjectKPIYearMapping.setNovember(customProjectKPIYearMappingDTOPost.getNovember());
			if (customProjectKPIYearMappingDTOPost.getDecember() != -1)
				customProjectKPIYearMapping.setDecember(customProjectKPIYearMappingDTOPost.getDecember());
			Optional<CustomKPI> findByCustomKpiName = this.customKPIRepository
					.findByCustomKpiName(customProjectKPIYearMappingDTOPost.getCustomKpiName());
			CustomKPI customKPI = findByCustomKpiName.get();
			customProjectKPIYearMapping.setCustomKpiId(customKPI.getCustomKpiId());
			customProjectKPIYearMapping
					.setCustomKpiThreshold(customProjectKPIYearMappingDTOPost.getCustomKpiThreshold());
			this.customProjectKPIYearMappingRepository.save(customProjectKPIYearMapping);
		}
	}

	@Override
	public ProjectKPIUse getAllKpiByMonths(String projectName, String kpiName, int year) {
		Optional<Project> findByProjectName = this.projectRepository.findByProjectName(projectName);
		Project project = findByProjectName.get();
		Optional<KPI> findByKpiName = this.kpiRepository.findByKpiName(kpiName);
		int kpiId = 0;
		if (findByKpiName.isEmpty()) {
			Optional<CustomKPI> findByCustomKpiName = this.customKPIRepository.findByCustomKpiName(kpiName);
			kpiId = findByCustomKpiName.get().getCustomKpiId();
			Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
					.findByProjectIdAndCustomKpiIdAndYear(project.getProjectID(), kpiId, year);
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear.get();
			ProjectKPIUse projectKPIUse = new ProjectKPIUse();
			List<KPIUse> kpis = new ArrayList<>();
			KPIUse kpiUse = new KPIUse();
			kpiUse.setMonth("January");
			kpiUse.setKPI(customProjectKPIYearMapping.getJanuary());
			kpiUse.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse);
			KPIUse kpiUse2 = new KPIUse();
			kpiUse2.setMonth("February");
			kpiUse2.setKPI(customProjectKPIYearMapping.getFebruary());
			kpiUse2.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse2);

			KPIUse kpiUse3 = new KPIUse();
			kpiUse3.setMonth("March");
			kpiUse3.setKPI(customProjectKPIYearMapping.getMarch());
			kpiUse3.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse3);

			KPIUse kpiUse4 = new KPIUse();
			kpiUse4.setMonth("April");
			kpiUse4.setKPI(customProjectKPIYearMapping.getApril());
			kpiUse4.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse4);

			KPIUse kpiUse5 = new KPIUse();
			kpiUse5.setMonth("May");
			kpiUse5.setKPI(customProjectKPIYearMapping.getMay());
			kpiUse5.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse5);

			KPIUse kpiUse6 = new KPIUse();
			kpiUse6.setMonth("June");
			kpiUse6.setKPI(customProjectKPIYearMapping.getJune());
			kpiUse6.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse6);

			KPIUse kpiUse7 = new KPIUse();
			kpiUse7.setMonth("July");
			kpiUse7.setKPI(customProjectKPIYearMapping.getJuly());
			kpiUse7.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse7);

			KPIUse kpiUse8 = new KPIUse();
			kpiUse8.setMonth("August");
			kpiUse8.setKPI(customProjectKPIYearMapping.getAugust());
			kpiUse8.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse8);

			KPIUse kpiUse9 = new KPIUse();
			kpiUse9.setMonth("September");
			kpiUse9.setKPI(customProjectKPIYearMapping.getSeptember());
			kpiUse9.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse9);

			KPIUse kpiUse10 = new KPIUse();
			kpiUse10.setMonth("October");
			kpiUse10.setKPI(customProjectKPIYearMapping.getOctober());
			kpiUse10.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse10);

			KPIUse kpiUse11 = new KPIUse();
			kpiUse11.setMonth("November");
			kpiUse11.setKPI(customProjectKPIYearMapping.getNovember());
			kpiUse11.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse11);

			KPIUse kpiUse12 = new KPIUse();
			kpiUse12.setMonth("December");
			kpiUse12.setKPI(customProjectKPIYearMapping.getDecember());
			kpiUse12.setThreshold(customProjectKPIYearMapping.getCustomKpiThreshold());
			kpis.add(kpiUse12);
			projectKPIUse.setKpis(kpis);
			return projectKPIUse;
		} else {
			kpiId = findByKpiName.get().getKpiId();
			Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
					.findByProjectIdAndKpiIdAndYear(project.getProjectID(), kpiId, year);
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
			ProjectKPIUse projectKPIUse = new ProjectKPIUse();
			List<KPIUse> kpis = new ArrayList<>();
			KPIUse kpiUse = new KPIUse();
			kpiUse.setMonth("January");
			kpiUse.setKPI(projectKPIYearMapping.getJanuary());
			kpiUse.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse);
			KPIUse kpiUse2 = new KPIUse();
			kpiUse2.setMonth("February");
			kpiUse2.setKPI(projectKPIYearMapping.getFebruary());
			kpiUse2.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse2);

			KPIUse kpiUse3 = new KPIUse();
			kpiUse3.setMonth("March");
			kpiUse3.setKPI(projectKPIYearMapping.getMarch());
			kpiUse3.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse3);

			KPIUse kpiUse4 = new KPIUse();
			kpiUse4.setMonth("April");
			kpiUse4.setKPI(projectKPIYearMapping.getApril());
			kpiUse4.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse4);

			KPIUse kpiUse5 = new KPIUse();
			kpiUse5.setMonth("May");
			kpiUse5.setKPI(projectKPIYearMapping.getMay());
			kpiUse5.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse5);

			KPIUse kpiUse6 = new KPIUse();
			kpiUse6.setMonth("June");
			kpiUse6.setKPI(projectKPIYearMapping.getJune());
			kpiUse6.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse6);

			KPIUse kpiUse7 = new KPIUse();
			kpiUse7.setMonth("July");
			kpiUse7.setKPI(projectKPIYearMapping.getJuly());
			kpiUse7.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse7);

			KPIUse kpiUse8 = new KPIUse();
			kpiUse8.setMonth("August");
			kpiUse8.setKPI(projectKPIYearMapping.getAugust());
			kpiUse8.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse8);

			KPIUse kpiUse9 = new KPIUse();
			kpiUse9.setMonth("September");
			kpiUse9.setKPI(projectKPIYearMapping.getSeptember());
			kpiUse9.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse9);

			KPIUse kpiUse10 = new KPIUse();
			kpiUse10.setMonth("October");
			kpiUse10.setKPI(projectKPIYearMapping.getOctober());
			kpiUse10.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse10);

			KPIUse kpiUse11 = new KPIUse();
			kpiUse11.setMonth("November");
			kpiUse11.setKPI(projectKPIYearMapping.getNovember());
			kpiUse11.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse11);

			KPIUse kpiUse12 = new KPIUse();
			kpiUse12.setMonth("December");
			kpiUse12.setKPI(projectKPIYearMapping.getDecember());
			kpiUse12.setThreshold(projectKPIYearMapping.getKpiThreshold());
			kpis.add(kpiUse12);
			projectKPIUse.setKpis(kpis);
			return projectKPIUse;
		}

	}

	@Override
	public ProjectKPIUse2 getAllKpiByMonths2(String projectName, int year) {
		Optional<Project> findByProjectName = this.projectRepository.findByProjectName(projectName);
		Project project = findByProjectName.get();
		List<Optional<ProjectKPIYearMapping>> findByProjectIdAndYear = this.projectKPIYearMappingRepository
				.findByProjectIdAndYear(project.getProjectID(), year);
		List<Optional<CustomProjectKPIYearMapping>> findByProjectIdAndYear2 = this.customProjectKPIYearMappingRepository
				.findByProjectIdAndYear(project.getProjectID(), year);

		ProjectKPIUse2 projectKPIUse2 = new ProjectKPIUse2();
		ArrayList<KPIUse2> arrayList = new ArrayList<>();
		HashMap<String, Integer> hash_map = new HashMap<String, Integer>();
		KPIUse2 kpiUse1 = new KPIUse2();
		kpiUse1.setMonth("January");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getJanuary();
			hash_map.put(kpiName, value);

		}
		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getJanuary();
			hash_map.put(customKpiName, value);
			kpiUse1.setValues(hash_map);

		}
		arrayList.add(kpiUse1);

		HashMap<String, Integer> hash_map2 = new HashMap<String, Integer>();
		KPIUse2 kpiUse2 = new KPIUse2();
		kpiUse2.setMonth("February");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getFebruary();
			hash_map2.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getFebruary();
			hash_map2.put(customKpiName, value);
			kpiUse2.setValues(hash_map);

		}

		arrayList.add(kpiUse2);

		HashMap<String, Integer> hash_map3 = new HashMap<String, Integer>();
		KPIUse2 kpiUse3 = new KPIUse2();
		kpiUse3.setMonth("March");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getMarch();
			hash_map3.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getMarch();
			hash_map3.put(customKpiName, value);
			kpiUse3.setValues(hash_map3);

		}

		arrayList.add(kpiUse3);

		HashMap<String, Integer> hash_map4 = new HashMap<String, Integer>();
		KPIUse2 kpiUse4 = new KPIUse2();
		kpiUse4.setMonth("April");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getApril();
			hash_map4.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getApril();
			hash_map4.put(customKpiName, value);
			kpiUse4.setValues(hash_map4);

		}

		arrayList.add(kpiUse4);

		HashMap<String, Integer> hash_map5 = new HashMap<String, Integer>();
		KPIUse2 kpiUse5 = new KPIUse2();
		kpiUse5.setMonth("May");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getMay();
			hash_map5.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getMay();
			hash_map5.put(customKpiName, value);
			kpiUse5.setValues(hash_map5);

		}
		arrayList.add(kpiUse5);

		HashMap<String, Integer> hash_map6 = new HashMap<String, Integer>();
		KPIUse2 kpiUse6 = new KPIUse2();
		kpiUse6.setMonth("June");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getJune();
			hash_map6.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getJune();
			hash_map6.put(customKpiName, value);
			kpiUse6.setValues(hash_map6);

		}
		arrayList.add(kpiUse6);

		HashMap<String, Integer> hash_map7 = new HashMap<String, Integer>();
		KPIUse2 kpiUse7 = new KPIUse2();
		kpiUse7.setMonth("July");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getJuly();
			hash_map7.put(kpiName, value);
		}
		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getJuly();
			hash_map7.put(customKpiName, value);
			kpiUse7.setValues(hash_map7);
		}

		arrayList.add(kpiUse7);

		HashMap<String, Integer> hash_map8 = new HashMap<String, Integer>();
		KPIUse2 kpiUse8 = new KPIUse2();
		kpiUse8.setMonth("August");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getAugust();
			hash_map8.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getAugust();
			hash_map8.put(customKpiName, value);
			kpiUse8.setValues(hash_map8);

		}
		arrayList.add(kpiUse8);

		HashMap<String, Integer> hash_map9 = new HashMap<String, Integer>();
		KPIUse2 kpiUse9 = new KPIUse2();
		kpiUse9.setMonth("September");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getSeptember();
			hash_map9.put(kpiName, value);
		}
		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getSeptember();
			hash_map9.put(customKpiName, value);
			kpiUse9.setValues(hash_map9);

		}
		arrayList.add(kpiUse9);

		HashMap<String, Integer> hash_map10 = new HashMap<String, Integer>();
		KPIUse2 kpiUse10 = new KPIUse2();
		kpiUse10.setMonth("October");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getOctober();
			hash_map10.put(kpiName, value);
		}
		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getOctober();
			hash_map10.put(customKpiName, value);
			kpiUse10.setValues(hash_map10);

		}
		arrayList.add(kpiUse10);

		HashMap<String, Integer> hash_map11 = new HashMap<String, Integer>();
		KPIUse2 kpiUse11 = new KPIUse2();
		kpiUse11.setMonth("November");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getNovember();
			hash_map11.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getNovember();
			hash_map11.put(customKpiName, value);
			kpiUse11.setValues(hash_map11);

		}
		arrayList.add(kpiUse11);

		HashMap<String, Integer> hash_map12 = new HashMap<String, Integer>();
		KPIUse2 kpiUse12 = new KPIUse2();
		kpiUse12.setMonth("December");
		for (int i = 0; i < findByProjectIdAndYear.size(); i++) {
			ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndYear.get(i).get();
			Optional<KPI> findById = this.kpiRepository.findById(projectKPIYearMapping.getKpiId());
			KPI kpi = findById.get();
			String kpiName = kpi.getKpiName();
			int value = projectKPIYearMapping.getDecember();
			hash_map12.put(kpiName, value);
		}

		for (int i = 0; i < findByProjectIdAndYear2.size(); i++) {
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndYear2.get(i).get();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(customProjectKPIYearMapping.getCustomKpiId());
			CustomKPI customKPI = findById.get();
			String customKpiName = customKPI.getCustomKpiName();
			int value = customProjectKPIYearMapping.getDecember();
			hash_map12.put(customKpiName, value);
			kpiUse12.setValues(hash_map12);

		}
		arrayList.add(kpiUse12);

		projectKPIUse2.setKpis(arrayList);
		return projectKPIUse2;
	}

	@Override
	public List<ProjectDTO> getProjectbyAccess(String userName) {
		System.out.println("1");
		System.out.println(userName);
		Optional<User> findByUserName = this.userRepository.findByUserName(userName);
		User user = findByUserName.get();
		List<ProjectDTO> arrayList = new ArrayList<>();
		System.out.println("2" + user.getRole().getRoleName());
		List<Du> dus = user.getDus();
		List<ProfitCenter> profitCenters = user.getProfitCenters();
		List<Client> clients = user.getClients();
		
		List<Integer> dusId = new ArrayList<>();
		List<Integer> profitCentersId = new ArrayList<>();
		List<Integer> clientsId = new ArrayList<>();

		for (int i = 0; i < dus.size(); i++) {
			dusId.add(dus.get(i).getDuId());
		}

		for (int i = 0; i < profitCenters.size(); i++) {
			profitCentersId.add(profitCenters.get(i).getProfitCenterId());
		}

		for (int i = 0; i < clients.size(); i++) {
			clientsId.add(clients.get(i).getClientId());
		}

		List<Optional<Project>> findByProjectDUAndProjectProfitCenterAndProjectClient = this.projectRepository
				.findByProjectDUAndProjectProfitCenterAndProjectClient(dusId, profitCentersId, clientsId);
		for (int a = 0; a < findByProjectDUAndProjectProfitCenterAndProjectClient.size(); a++) {
			Optional<Project> optional = findByProjectDUAndProjectProfitCenterAndProjectClient.get(a);
			Project project = optional.get();
			System.out.println("here");
			System.out.println("6" + project.getProjectID());
			ProjectDTO usertoDTO = this.UsertoDTO(project);
			arrayList.add(usertoDTO);
		}

		System.out.println("sizeee" + arrayList.size());
		return arrayList;
	}

	@Override
	public List<KPIAll> getDistinctKpis(List<Integer> projectIds) {
		ArrayList<KPIAll> arrayList = new ArrayList<>();
		List<Integer> findDistinctKpiIdsByProjectIds = this.projectKPIMappingRepository
				.findDistinctKpiIdsByProjectIds(projectIds);
		for (int i = 0; i < findDistinctKpiIdsByProjectIds.size(); i++) {
			KPIAll kpiAll = new KPIAll();
			Optional<KPI> findById = this.kpiRepository.findById(findDistinctKpiIdsByProjectIds.get(i));
			KPI kpi = findById.get();
			kpiAll.setId(kpi.getKpiId());
			kpiAll.setName(kpi.getKpiName());
			arrayList.add(kpiAll);
		}

		List<Integer> findDistinctCustomKpiIdsByCustomProjectIds = this.customProjectKPIMappingRepository
				.findDistinctCustomKpiIdsByCustomProjectIds(projectIds);
		for (int i = 0; i < findDistinctCustomKpiIdsByCustomProjectIds.size(); i++) {
			KPIAll kpiAll = new KPIAll();
			Optional<CustomKPI> findById = this.customKPIRepository
					.findById(findDistinctCustomKpiIdsByCustomProjectIds.get(i));
			CustomKPI customKPI = findById.get();
			List<Optional<CustomProjectKPIYearMapping>> findByCustomKpiId = this.customProjectKPIYearMappingRepository
					.findByCustomKpiId(customKPI.getCustomKpiId());
			CustomProjectKPIYearMapping customProjectKPIYearMapping = findByCustomKpiId.get(0).get();
			Optional<Project> findById2 = this.projectRepository.findById(customProjectKPIYearMapping.getProjectId());
			Project project = findById2.get();
			String s = project.getProjectName() + " " + customKPI.getCustomKpiName();
			kpiAll.setId(customKPI.getCustomKpiId());
			kpiAll.setName(s);
			// boolean isNamePresent = false;
			// for (KPIAll existingKpiAll : arrayList) {
			// if (existingKpiAll.getName().equals(kpiAll.getName())) {
			// isNamePresent = true;
			// break;
			// }
			// }

			// if (!isNamePresent) {
			// arrayList.add(kpiAll);
			// }

			arrayList.add(kpiAll);
		}

		return arrayList;
	}

	@Override
	public ProjectKPIUse4 getAllKpiByMonths3(List<Integer> projectIds, List<Integer> kpiIds, int year) {
		Collections.sort(projectIds);
		Collections.sort(kpiIds);
		ProjectKPIUse4 projectKPIUse4 = new ProjectKPIUse4();
		List<HashMap<String, Object>> kpis = new ArrayList<>();
		HashMap<String, Object> hashmap1 = new HashMap<String, Object>();
		hashmap1.put("Month", "January");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			System.out.println("size hai bhai" + kpiIds.size());
			for (int j = 0; j < kpiIds.size(); j++) {
				System.out.println("rajat n" + kpiIds.get(j));
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap1.put(result, projectKPIYearMapping.getJanuary());
						hashmap1.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					System.out.println("here");
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					System.out.println("rajat nagar" + kpiName);
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					System.out.println("ye le " + projectIds.get(i));
					System.out.println("ye le 2 " + kpiIds.get(j));
					System.out.println("ye le 3 " + year);
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap1.put(result, customProjectKPIYearMapping.getJanuary());
						hashmap1.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}
		kpis.add(hashmap1);
		HashMap<String, Object> hashmap2 = new HashMap<String, Object>();
		hashmap2.put("Month", "February");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap2.put(result, projectKPIYearMapping.getFebruary());
						hashmap2.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap2.put(result, customProjectKPIYearMapping.getFebruary());
						hashmap2.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}

		kpis.add(hashmap2);
		HashMap<String, Object> hashmap3 = new HashMap<String, Object>();
		hashmap3.put("Month", "March");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap3.put(result, projectKPIYearMapping.getMarch());
						hashmap3.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap3.put(result, customProjectKPIYearMapping.getMarch());
						hashmap3.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}

		kpis.add(hashmap3);
		HashMap<String, Object> hashmap4 = new HashMap<String, Object>();
		hashmap4.put("Month", "April");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap4.put(result, projectKPIYearMapping.getApril());
						hashmap4.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap4.put(result, customProjectKPIYearMapping.getApril());
						hashmap4.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}

		kpis.add(hashmap4);
		HashMap<String, Object> hashmap5 = new HashMap<String, Object>();
		hashmap5.put("Month", "May");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap5.put(result, projectKPIYearMapping.getMay());
						hashmap5.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {

					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap5.put(result, customProjectKPIYearMapping.getMay());
						hashmap5.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}

		kpis.add(hashmap5);
		HashMap<String, Object> hashmap6 = new HashMap<String, Object>();
		hashmap6.put("Month", "June");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap6.put(result, projectKPIYearMapping.getJune());
						hashmap6.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap6.put(result, customProjectKPIYearMapping.getJune());
						hashmap6.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}
		kpis.add(hashmap6);

		HashMap<String, Object> hashmap7 = new HashMap<String, Object>();
		hashmap7.put("Month", "July");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap7.put(result, projectKPIYearMapping.getJuly());
						hashmap7.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap7.put(result, customProjectKPIYearMapping.getJuly());
						hashmap7.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}

		kpis.add(hashmap7);
		HashMap<String, Object> hashmap8 = new HashMap<String, Object>();
		hashmap8.put("Month", "August");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap8.put(result, projectKPIYearMapping.getAugust());
						hashmap8.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap8.put(result, customProjectKPIYearMapping.getAugust());
						hashmap8.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}
		kpis.add(hashmap8);
		HashMap<String, Object> hashmap9 = new HashMap<String, Object>();
		hashmap9.put("Month", "September");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap9.put(result, projectKPIYearMapping.getSeptember());
						hashmap9.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap9.put(result, customProjectKPIYearMapping.getSeptember());
						hashmap9.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}
		kpis.add(hashmap9);
		HashMap<String, Object> hashmap10 = new HashMap<String, Object>();
		hashmap10.put("Month", "October");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap10.put(result, projectKPIYearMapping.getOctober());
						hashmap10.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap10.put(result, customProjectKPIYearMapping.getOctober());
						hashmap10.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}

		kpis.add(hashmap10);
		HashMap<String, Object> hashmap11 = new HashMap<String, Object>();
		hashmap11.put("Month", "November");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap11.put(result, projectKPIYearMapping.getNovember());
						hashmap11.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap11.put(result, customProjectKPIYearMapping.getNovember());
						hashmap11.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}

		kpis.add(hashmap11);
		HashMap<String, Object> hashmap12 = new HashMap<String, Object>();
		hashmap12.put("Month", "December");
		for (int i = 0; i < projectIds.size(); i++) {
			Optional<Project> findById = this.projectRepository.findById(projectIds.get(i));
			Project project = findById.get();
			String projectName = project.getProjectName();
			for (int j = 0; j < kpiIds.size(); j++) {
				if (kpiIds.get(j) < 18) {
					Optional<KPI> findById2 = this.kpiRepository.findById(kpiIds.get(j));
					KPI kpi = findById2.get();
					String kpiName = kpi.getKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<ProjectKPIYearMapping> findByProjectIdAndKpiIdAndYear = this.projectKPIYearMappingRepository
							.findByProjectIdAndKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndKpiIdAndYear.isPresent()) {
						ProjectKPIYearMapping projectKPIYearMapping = findByProjectIdAndKpiIdAndYear.get();
						hashmap12.put(result, projectKPIYearMapping.getDecember());
						hashmap12.put(resultThreshold, projectKPIYearMapping.getKpiThreshold());
					} else {
						continue;
					}
				} else {
					Optional<CustomKPI> findById2 = this.customKPIRepository.findById(kpiIds.get(j));
					CustomKPI customKPI = findById2.get();
					String kpiName = customKPI.getCustomKpiName();
					String result = projectName + " " + kpiName;
					String resultThreshold = result + "Threshold";
					Optional<CustomProjectKPIYearMapping> findByProjectIdAndCustomKpiIdAndYear = this.customProjectKPIYearMappingRepository
							.findByProjectIdAndCustomKpiIdAndYear(projectIds.get(i), kpiIds.get(j), year);
					if (findByProjectIdAndCustomKpiIdAndYear.isPresent()) {
						CustomProjectKPIYearMapping customProjectKPIYearMapping = findByProjectIdAndCustomKpiIdAndYear
								.get();
						hashmap12.put(result, customProjectKPIYearMapping.getDecember());
						hashmap12.put(resultThreshold, customProjectKPIYearMapping.getCustomKpiThreshold());
					} else {
						continue;
					}
				}
			}

		}
		kpis.add(hashmap12);

		projectKPIUse4.setKpis(kpis);
		return projectKPIUse4;
	}

}

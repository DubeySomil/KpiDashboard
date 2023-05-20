package com.soprasteria.aeroline.kpidashboard;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.soprasteria.aeroline.kpidashboard.dao.ClientRepository;
import com.soprasteria.aeroline.kpidashboard.dao.DURepository;
import com.soprasteria.aeroline.kpidashboard.dao.KPIRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProfitCenterRepository;
import com.soprasteria.aeroline.kpidashboard.dao.RoleRepository;
import com.soprasteria.aeroline.kpidashboard.dao.UserRepository;
import com.soprasteria.aeroline.kpidashboard.entity.Client;
import com.soprasteria.aeroline.kpidashboard.entity.Du;
import com.soprasteria.aeroline.kpidashboard.entity.KPI;
import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;
import com.soprasteria.aeroline.kpidashboard.entity.Role;
import com.soprasteria.aeroline.kpidashboard.entity.User;

/* This Application is designed by 
Rishabh Jain
Rajat Nagar
Somil Dubey */

@SpringBootApplication
public class KpiDashboardApplication implements CommandLineRunner{

	@Autowired
	private KPIRepository kpiRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private DURepository duRepository;

	@Autowired
	private ProfitCenterRepository profitCenterRepository;

	@Autowired
	private ClientRepository clientRepository;

	public static void main(String[] args) {
		SpringApplication.run(KpiDashboardApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
		ArrayList<KPI> arrayList = new ArrayList<>();
		KPI kpi = new KPI();
		kpi.setKpiId(1);
		kpi.setKpiName("OTD");
		kpi.setKpiDesc("On Time Delivery");
		arrayList.add(kpi);
		KPI kpi2 = new KPI();
		kpi2.setKpiId(2);
		kpi2.setKpiName("DDBD");
		kpi2.setKpiDesc("Defect Density Before Delivery");
		arrayList.add(kpi2);
		KPI kpi3 = new KPI();
		kpi3.setKpiId(3);
		kpi3.setKpiName("DDAD");
		kpi3.setKpiDesc("Defect Density After Delivery");
		arrayList.add(kpi3);
		KPI kpi4 = new KPI();
		kpi4.setKpiId(4);
		kpi4.setKpiName("Sprint Velocity Compliance");
		kpi4.setKpiDesc("Sprint Velocity Compliance");
		arrayList.add(kpi4);
		KPI kpi5 = new KPI();
		kpi5.setKpiId(5);
		kpi5.setKpiName("Burndown Chart");
		kpi5.setKpiDesc("Burndown Chart");
		arrayList.add(kpi5);
		KPI kpi6 = new KPI();
		kpi6.setKpiId(6);
		kpi6.setKpiName("Sprint Burnup Chart");
		kpi6.setKpiDesc("Sprint Burnup Chart");
		arrayList.add(kpi6);
		KPI kpi7 = new KPI();
		kpi7.setKpiId(7);
		kpi7.setKpiName("Sprint Predictability");
		kpi7.setKpiDesc("Sprint Predictability");
		arrayList.add(kpi7);
		KPI kpi8 = new KPI();
		kpi8.setKpiId(8);
		kpi8.setKpiName("Release Defect Density");
		kpi8.setKpiDesc("Release Defect Density");
		arrayList.add(kpi8);
		KPI kpi9 = new KPI();
		kpi9.setKpiId(9);
		kpi9.setKpiName("Team Stability");
		kpi9.setKpiDesc("Team Stability");
		arrayList.add(kpi9);
		KPI kpi10 = new KPI();
		kpi10.setKpiId(10);
		kpi10.setKpiName("Right First Time Right");
		kpi10.setKpiDesc("Right First Time Right");
		arrayList.add(kpi10);
		KPI kpi11 = new KPI();
		kpi11.setKpiId(11);
		kpi11.setKpiName("NDDB");
		kpi11.setKpiDesc("NDDB");
		arrayList.add(kpi11);
		KPI kpi12 = new KPI();
		kpi12.setKpiId(12);
		kpi12.setKpiName("NDAD");
		kpi12.setKpiDesc("NDAD");
		arrayList.add(kpi12);
		KPI kpi13 = new KPI();
		kpi13.setKpiId(13);
		kpi13.setKpiName("Renegociated on-time delivery");
		kpi13.setKpiDesc("Renegociated on-time delivery");
		arrayList.add(kpi13);
		KPI kpi14 = new KPI();
		kpi14.setKpiId(14);
		kpi14.setKpiName("Number of delivery");
		kpi14.setKpiDesc("Number of delivery");
		arrayList.add(kpi14);
		KPI kpi15 = new KPI();
		kpi15.setKpiId(15);
		kpi15.setKpiName("On-time critical doc");
		kpi15.setKpiDesc("On-time critical doc");
		arrayList.add(kpi15);
		KPI kpi16 = new KPI();
		kpi16.setKpiId(16);
		kpi16.setKpiName("Number of defects between M9 and M11");
		kpi16.setKpiDesc("Number of defects between M9 and M11");

		arrayList.add(kpi16);
		KPI kpi17 = new KPI();
		kpi17.setKpiId(17);
		kpi17.setKpiName("Number of defects between M11 and M14");
		kpi17.setKpiDesc("Number of defects between M11 and M14");
		arrayList.add(kpi17);
		this.kpiRepository.saveAll(arrayList);

		ArrayList<Role> arrayList2 = new ArrayList<>();
		Role role = new Role();
		role.setRoleId(1);
		role.setRoleName("Admin");
		
		arrayList2.add(role);
		Role role2 = new Role();
		role2.setRoleId(2);
		role2.setRoleName("DU Head");

		arrayList2.add(role2);

		Role role3 = new Role();
		role3.setRoleId(3);
		role3.setRoleName("PC Head");
		arrayList2.add(role3);

		Role role4 = new Role();
		role4.setRoleId(4);
		role4.setRoleName("Client Head");
		arrayList2.add(role4);

		Role role5 = new Role();
		role5.setRoleId(5);
		role5.setRoleName("Manager");
		arrayList2.add(role5);

		Role role6 = new Role();
		role6.setRoleId(6);
		role6.setRoleName("DI");
		arrayList2.add(role6);

		this.roleRepository.saveAll(arrayList2);



		
		// User user2 = new User();
		// user2.setUserId(2);
		// user2.setUserFirstName("Murari");
		// user2.setUserLastName("Didwania");
		// user2.setUserName("mdidwania");
		// user2.setUserEmail("murari.didwania@soprasteria.com");
		// user2.setUserPassword("Murari123");
		// this.userRepository.save(user2);

		// User user3 = new User();
		// user3.setUserId(3);
		// user3.setUserFirstName("Vishal");
		// user3.setUserLastName("Tyagi");
		// user3.setUserName("vtyagi");
		// user3.setUserEmail("vishal.tyagi@soprasteria.com");
		// user3.setUserPassword("Vishal123");
		// this.userRepository.save(user3);

		// User user4 = new User();
		// user4.setUserId(4);
		// user4.setUserFirstName("Vijay");
		// user4.setUserLastName("Sinha");
		// user4.setUserName("vksinha");
		// user4.setUserEmail("vijay.sinha@soprasteria.com");
		// user4.setUserPassword("Vijay123");
		// this.userRepository.save(user4);

		// User user5 = new User();
		// user5.setUserId(5);
		// user5.setUserFirstName("Ayushi");
		// user5.setUserLastName("Sharma");
		// user5.setUserName("asharma");
		// user5.setUserEmail("ayushi.sharma@soprasteria.com");
		// user5.setUserPassword("Ayushi123");
		// this.userRepository.save(user5);

		// User user6 = new User();
		// user6.setUserId(6);
		// user6.setUserFirstName("Shailender");
		// user6.setUserLastName("Singh");
		// user6.setUserName("ssingh");
		// user6.setUserEmail("shailender.singh@soprasteria.com");
		// user6.setUserPassword("Sh123");
		// this.userRepository.save(user6);

		
		ArrayList<Client> arrayList5 = new ArrayList<>();

		Client client = new Client();
		client.setClientId(1);
		client.setClientName("Aeroline Digital");

		arrayList5.add(client);

		Client client2 = new Client();
		client2.setClientId(2);
		client2.setClientName("Aeroline Management");

		arrayList5.add(client2);

		Client client3 = new Client();
		client3.setClientId(3);
		client3.setClientName("Airbus Skywise");

		arrayList5.add(client3);

		Client client4 = new Client();
		client4.setClientId(4);
		client4.setClientName("Airbus Atlantic");

		arrayList5.add(client4);

		Client client5 = new Client();
		client5.setClientId(5);
		client5.setClientName("Airbus CS");

		arrayList5.add(client5);

		Client client6 = new Client();
		client6.setClientId(6);
		client6.setClientName("Airbus E2E PLM");

		arrayList5.add(client6);
		Client client7 = new Client();
		client7.setClientId(7);
		client7.setClientName("Airbus MO");

		arrayList5.add(client7);

		Client client8 = new Client();
		client8.setClientId(8);
		client8.setClientName("Airbus Prog & SC");

		arrayList5.add(client8);

		Client client9 = new Client();
		client9.setClientId(9);
		client9.setClientName("Airbus UK");

		arrayList5.add(client9);

		Client client10 = new Client();
		client10.setClientId(10);
		client10.setClientName("Airbus Helicopter");

		arrayList5.add(client10);

		Client client11 = new Client();
		client11.setClientId(11);
		client11.setClientName("Airbus India");

		arrayList5.add(client11);

		Client client12 = new Client();
		client12.setClientId(12);
		client12.setClientName("CIMPA");

		arrayList5.add(client12);

		Client client13 = new Client();
		client13.setClientId(13);
		client13.setClientName("CIMPA_BGLR");

		arrayList5.add(client13);

		Client client14 = new Client();
		client14.setClientId(14);
		client14.setClientName("CIMPA_M_GERMANY");

		arrayList5.add(client14);

		Client client15 = new Client();
		client15.setClientId(15);
		client15.setClientName("CIMPA_Noida");

		arrayList5.add(client15);

		Client client16 = new Client();
		client16.setClientId(16);
		client16.setClientName("CIMPA_OTHERS");

		arrayList5.add(client16);

		Client client17 = new Client();
		client17.setClientId(17);
		client17.setClientName("CIMPA_W_PARIS");

		arrayList5.add(client17);

		Client client18 = new Client();
		client18.setClientId(18);
		client18.setClientName("CIMPA_Airbus_OTHERS");

		arrayList5.add(client18);

		Client client19 = new Client();
		client19.setClientId(19);
		client19.setClientName("CIMPA_IS_LM");

		arrayList5.add(client19);

		Client client20 = new Client();
		client20.setClientId(20);
		client20.setClientName("CIMPA_TDM");

		arrayList5.add(client20);
		Client client21 = new Client();
		client21.setClientId(21);
		client21.setClientName("Dassault");

		arrayList5.add(client21);

		Client client22 = new Client();
		client22.setClientId(22);
		client22.setClientName("SABCA");

		arrayList5.add(client22);

		Client client23 = new Client();
		client23.setClientId(23);
		client23.setClientName("Safran");

		arrayList5.add(client23);

		Client client24 = new Client();
		client24.setClientId(24);
		client24.setClientName("SAFRAN_SAE_SAP_INDUSTRY_V1_S3");

		arrayList5.add(client24);

		Client client25 = new Client();
		client25.setClientId(25);
		client25.setClientName("SAP_BASIS");

		arrayList5.add(client25);

		Client client26 = new Client();
		client26.setClientId(26);
		client26.setClientName("SAP_Jeunes");

		arrayList5.add(client26);

		Client client27 = new Client();
		client27.setClientId(27);
		client27.setClientName("ST_Microelectronics");

		arrayList5.add(client27);

		Client client28 = new Client();
		client28.setClientId(28);
		client28.setClientName("NAVBLUE");

		arrayList5.add(client28);

		Client client29 = new Client();
		client29.setClientId(29);
		client29.setClientName("STIE-Airbus-BLR");

		arrayList5.add(client29);

		Client client30 = new Client();
		client30.setClientId(30);
		client30.setClientName("STIE-Airbus-CHE");

		arrayList5.add(client30);

		Client client31 = new Client();
		client31.setClientId(31);
		client31.setClientName("STIE-Airbus-NOI");

		arrayList5.add(client31);

		Client client32 = new Client();
		client32.setClientId(32);
		client32.setClientName("STIE-EYY");

		arrayList5.add(client32);

		Client client33 = new Client();
		client33.setClientId(33);
		client33.setClientName("Thales ERP");

		arrayList5.add(client33);

		Client client34 = new Client();
		client34.setClientId(34);
		client34.setClientName("Thales OCM");

		arrayList5.add(client34);

		Client client35 = new Client();
		client35.setClientId(35);
		client35.setClientName("Dummy Client 1");

		arrayList5.add(client35);

		Client client36 = new Client();
		client36.setClientId(36);
		client36.setClientName("Dummy Client 2");

		arrayList5.add(client36);

		Client client37 = new Client();
		client37.setClientId(37);
		client37.setClientName("Dummy Client 3");

		arrayList5.add(client37);

		Client client38 = new Client();
		client38.setClientId(38);
		client38.setClientName("Dummy Client 4");

		arrayList5.add(client38);

		Client client39 = new Client();
		client39.setClientId(39);
		client39.setClientName("Dummy Client 5");

		arrayList5.add(client39);

		Client client40 = new Client();
		client40.setClientId(40);
		client40.setClientName("Dummy Client 6");

		arrayList5.add(client40);

		Client client41 = new Client();
		client41.setClientId(41);
		client41.setClientName("Dummy Client 7");

		arrayList5.add(client41);

		Client client42 = new Client();
		client42.setClientId(42);
		client42.setClientName("Dummy Client 8");

		arrayList5.add(client42);

		Client client43 = new Client();
		client43.setClientId(43);
		client43.setClientName("Dummy Client 9");

		arrayList5.add(client43);

		Client client44 = new Client();
		client44.setClientId(44);
		client44.setClientName("Dummy Client 10");

		arrayList5.add(client44);

		this.clientRepository.saveAll(arrayList5);

		ArrayList<ProfitCenter> arrayList4 = new ArrayList<>();
		ProfitCenter profitCenter = new ProfitCenter();

		profitCenter.setProfitCenterId(1);
		profitCenter.setProfitCenterName("Aeroline Digital");
		List<Client> subList = arrayList5.subList(0, 1);
		profitCenter.setClients(subList);
		arrayList4.add(profitCenter);

		ProfitCenter profitCenter2 = new ProfitCenter();

		profitCenter2.setProfitCenterId(2);
		profitCenter2.setProfitCenterName("Aeroline Management");
		List<Client> subList2 = arrayList5.subList(1, 2);
		profitCenter2.setClients(subList2);
		arrayList4.add(profitCenter2);

		ProfitCenter profitCenter3 = new ProfitCenter();

		profitCenter3.setProfitCenterId(3);
		profitCenter3.setProfitCenterName("Airbus");
		List<Client> subList3 = arrayList5.subList(2, 9);
		profitCenter3.setClients(subList3);
		arrayList4.add(profitCenter3);

		ProfitCenter profitCenter4 = new ProfitCenter();

		profitCenter4.setProfitCenterId(4);
		profitCenter4.setProfitCenterName("Airbus Helicopter");
		List<Client> subList4 = arrayList5.subList(9, 10);
		profitCenter4.setClients(subList4);
		arrayList4.add(profitCenter4);

		ProfitCenter profitCenter5 = new ProfitCenter();

		profitCenter5.setProfitCenterId(5);
		profitCenter5.setProfitCenterName("Airbus India");
		List<Client> subList5 = arrayList5.subList(10, 11);
		profitCenter5.setClients(subList5);
		arrayList4.add(profitCenter5);

		ProfitCenter profitCenter6 = new ProfitCenter();

		profitCenter6.setProfitCenterId(6);
		profitCenter6.setProfitCenterName("CIMPA");
		List<Client> subList6 = arrayList5.subList(11, 17);
		profitCenter6.setClients(subList6);
		arrayList4.add(profitCenter6);

		ProfitCenter profitCenter7 = new ProfitCenter();

		profitCenter7.setProfitCenterId(7);
		profitCenter7.setProfitCenterName("CIMPA_AIRBUS");
		List<Client> subList7 = arrayList5.subList(17, 20);
		profitCenter7.setClients(subList7);
		arrayList4.add(profitCenter7);

		ProfitCenter profitCenter8 = new ProfitCenter();

		profitCenter8.setProfitCenterId(8);
		profitCenter8.setProfitCenterName("Dassault");
		List<Client> subList8 = arrayList5.subList(20, 21);
		profitCenter8.setClients(subList8);
		arrayList4.add(profitCenter8);

		ProfitCenter profitCenter9 = new ProfitCenter();

		profitCenter9.setProfitCenterId(9);
		profitCenter9.setProfitCenterName("SABCA");
		List<Client> subList9 = arrayList5.subList(21, 22);
		profitCenter9.setClients(subList9);
		arrayList4.add(profitCenter9);

		ProfitCenter profitCenter10 = new ProfitCenter();

		profitCenter10.setProfitCenterId(10);
		profitCenter10.setProfitCenterName("Safran");
		List<Client> subList10 = arrayList5.subList(22, 24);
		profitCenter10.setClients(subList10);
		arrayList4.add(profitCenter10);

		ProfitCenter profitCenter11 = new ProfitCenter();

		profitCenter11.setProfitCenterId(11);
		profitCenter11.setProfitCenterName("SAP Internal");
		List<Client> subList11 = arrayList5.subList(24, 25);
		profitCenter11.setClients(subList11);
		arrayList4.add(profitCenter11);

		ProfitCenter profitCenter12 = new ProfitCenter();

		profitCenter12.setProfitCenterId(12);
		profitCenter12.setProfitCenterName("SAP Jeunes");
		List<Client> subList12 = arrayList5.subList(25, 26);
		profitCenter12.setClients(subList12);
		arrayList4.add(profitCenter12);

		ProfitCenter profitCenter13 = new ProfitCenter();

		profitCenter13.setProfitCenterId(13);
		profitCenter13.setProfitCenterName("ST Microelectronics");
		List<Client> subList13 = arrayList5.subList(26, 27);
		profitCenter13.setClients(subList13);
		arrayList4.add(profitCenter13);

		ProfitCenter profitCenter14 = new ProfitCenter();

		profitCenter14.setProfitCenterId(14);
		profitCenter14.setProfitCenterName("STIE Airbus");
		List<Client> subList14 = arrayList5.subList(27, 32);
		profitCenter14.setClients(subList14);
		arrayList4.add(profitCenter14);

		ProfitCenter profitCenter15 = new ProfitCenter();

		profitCenter15.setProfitCenterId(15);
		profitCenter15.setProfitCenterName("Thales");
		List<Client> subList15 = arrayList5.subList(32, 34);
		profitCenter15.setClients(subList15);
		arrayList4.add(profitCenter15);

		

		

		this.profitCenterRepository.saveAll(arrayList4);

		ArrayList<ProfitCenter> arrayList6 = new ArrayList<>();

		ProfitCenter profitCenter16 = new ProfitCenter();

		profitCenter16.setProfitCenterId(16);
		profitCenter16.setProfitCenterName("Dummy PC 1");
		List<Client> subList16 = arrayList5.subList(34, 35);
		profitCenter16.setClients(subList16);
		arrayList6.add(profitCenter16);
		
		ProfitCenter profitCenter17 = new ProfitCenter();

		profitCenter17.setProfitCenterId(17);
		profitCenter17.setProfitCenterName("Dummy PC 2");
		List<Client> subList17 = arrayList5.subList(35, 36);
		profitCenter17.setClients(subList17);
		arrayList6.add(profitCenter17);

		ProfitCenter profitCenter18 = new ProfitCenter();

		profitCenter18.setProfitCenterId(18);
		profitCenter18.setProfitCenterName("Dummy PC 3");
		List<Client> subList18 = arrayList5.subList(36, 37);
		profitCenter18.setClients(subList18);
		arrayList6.add(profitCenter18);

		ProfitCenter profitCenter19 = new ProfitCenter();

		profitCenter19.setProfitCenterId(19);
		profitCenter19.setProfitCenterName("Dummy PC 4");
		List<Client> subList19 = arrayList5.subList(37, 38);
		profitCenter19.setClients(subList19);
		arrayList6.add(profitCenter19);

		ProfitCenter profitCenter20 = new ProfitCenter();

		profitCenter20.setProfitCenterId(20);
		profitCenter20.setProfitCenterName("Dummy PC 5");
		List<Client> subList20 = arrayList5.subList(38, 39);
		profitCenter20.setClients(subList20);
		arrayList6.add(profitCenter20);

		this.profitCenterRepository.saveAll(arrayList6);

		ArrayList<ProfitCenter> arrayList7 = new ArrayList<>();

		
		ProfitCenter profitCenter21 = new ProfitCenter();

		profitCenter21.setProfitCenterId(21);
		profitCenter21.setProfitCenterName("Dummy PC 6");
		List<Client> subList21 = arrayList5.subList(39, 40);
		profitCenter21.setClients(subList21);
		arrayList7.add(profitCenter21);

		ProfitCenter profitCenter22 = new ProfitCenter();

		profitCenter22.setProfitCenterId(22);
		profitCenter22.setProfitCenterName("Dummy PC 7");
		List<Client> subList22 = arrayList5.subList(40, 41);
		profitCenter22.setClients(subList22);
		arrayList7.add(profitCenter22);

		ProfitCenter profitCenter23 = new ProfitCenter();

		profitCenter23.setProfitCenterId(23);
		profitCenter23.setProfitCenterName("Dummy PC 8");
		List<Client> subList23 = arrayList5.subList(41, 42);
		profitCenter23.setClients(subList23);
		arrayList7.add(profitCenter23);

		ProfitCenter profitCenter24 = new ProfitCenter();

		profitCenter24.setProfitCenterId(24);
		profitCenter24.setProfitCenterName("Dummy PC 9");
		List<Client> subList24 = arrayList5.subList(42, 43);
		profitCenter24.setClients(subList24);
		arrayList7.add(profitCenter24);

		ProfitCenter profitCenter25 = new ProfitCenter();

		profitCenter25.setProfitCenterId(25);
		profitCenter25.setProfitCenterName("Dummy PC 10");
		List<Client> subList25 = arrayList5.subList(43, 44);
		profitCenter25.setClients(subList25);
		arrayList7.add(profitCenter25);

		this.profitCenterRepository.saveAll(arrayList7);


		ArrayList<Du> arrayList3 = new ArrayList<>();
		
		Du du = new Du();
		du.setDuId(1);
		du.setDuName("DU Aeroline (IN024)");
		du.setProfitCenters(arrayList4);
		
		arrayList3.add(du);

		Du du2 = new Du();
		du2.setDuId(2);
		du2.setDuName("DU France V&R");
		du2.setProfitCenters(arrayList6);

		arrayList3.add(du2);

		Du du3 = new Du();
		du3.setDuId(3);
		du3.setDuName("DU Germany");
		du3.setProfitCenters(arrayList7);

		arrayList3.add(du3);

		this.duRepository.saveAll(arrayList3);
		
		User user = new User();
		user.setUserId(1);
		user.setUserFirstName("admin");
		user.setUserLastName("admin");
		user.setUserName("admin");
		user.setUserEmail("admin@soprasteria.com");
		user.setUserPassword("admin123");
		user.setUserStatus(true);
		Optional<Role> findById = this.roleRepository.findById(1);
		Role role7 = findById.get();
		user.setRole(role7);
		user.setDus(arrayList3);
		arrayList4.addAll(arrayList6);
		arrayList4.addAll(arrayList7);
		user.setProfitCenters(arrayList4);
		user.setClients(arrayList5);
		this.userRepository.save(user);


	}


}

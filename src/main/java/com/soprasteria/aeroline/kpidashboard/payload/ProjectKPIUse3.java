package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ProjectKPIUse3 {
	private HashMap<String, List<KPIByProjectAndYear>> projects = new HashMap<String, List<KPIByProjectAndYear>>();

	public HashMap<String, List<KPIByProjectAndYear>> getProjects() {
		return projects;
	}

	public void setProjects(HashMap<String, List<KPIByProjectAndYear>> projects) {
		this.projects = projects;
	}

	public ProjectKPIUse3(HashMap<String, List<KPIByProjectAndYear>> projects) {
		super();
		this.projects = projects;
	}

	public ProjectKPIUse3() {
		super();
		// TODO Auto-generated constructor stub
	}

	

}

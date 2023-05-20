package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class KPIByProjectAndYear {
    private HashMap<String, List<KPIValues>> kpis = new HashMap<String, List<KPIValues>>();

	public HashMap<String, List<KPIValues>> getKpis() {
		return kpis;
	}

	public void setKpis(HashMap<String, List<KPIValues>> kpis) {
		this.kpis = kpis;
	}

	public KPIByProjectAndYear(HashMap<String, List<KPIValues>> kpis) {
		super();
		this.kpis = kpis;
	}

	public KPIByProjectAndYear() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	

    
}

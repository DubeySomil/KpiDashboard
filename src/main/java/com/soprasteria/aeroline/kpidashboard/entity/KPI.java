package com.soprasteria.aeroline.kpidashboard.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class KPI {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int kpiId;
    private String kpiName;
	private String kpiDesc;
	public int getKpiId() {
		return kpiId;
	}
	public void setKpiId(int kpiId) {
		this.kpiId = kpiId;
	}
	public String getKpiName() {
		return kpiName;
	}
	public void setKpiName(String kpiName) {
		this.kpiName = kpiName;
	}
	public String getKpiDesc() {
		return kpiDesc;
	}
	public void setKpiDesc(String kpiDesc) {
		this.kpiDesc = kpiDesc;
	}
	public KPI() {
	}
	public KPI(int kpiId, String kpiName, String kpiDesc) {
		this.kpiId = kpiId;
		this.kpiName = kpiName;
		this.kpiDesc = kpiDesc;
	}
	
	

}

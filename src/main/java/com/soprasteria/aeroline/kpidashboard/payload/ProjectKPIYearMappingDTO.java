package com.soprasteria.aeroline.kpidashboard.payload;

public class ProjectKPIYearMappingDTO {
    private int kpiId;
    private String kpiName;
    private int kpiThreshold;
    
    private MonthDTO month;

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

	public int getKpiThreshold() {
		return kpiThreshold;
	}

	public void setKpiThreshold(int kpiThreshold) {
		this.kpiThreshold = kpiThreshold;
	}

	public MonthDTO getMonth() {
		return month;
	}

	public void setMonth(MonthDTO month) {
		this.month = month;
	}

	public ProjectKPIYearMappingDTO() {
	}

	public ProjectKPIYearMappingDTO(int kpiId, String kpiName, int kpiThreshold, MonthDTO month) {
		this.kpiId = kpiId;
		this.kpiName = kpiName;
		this.kpiThreshold = kpiThreshold;
		this.month = month;
	}
	
}

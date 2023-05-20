package com.soprasteria.aeroline.kpidashboard.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomProjectKPIYearMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customProjectKPIYearId;
    private int customKpiId;
    private int projectId;
    private int customKpiThreshold;
    private int year;
    private int january;
    private int february;
    private int march;
    private int april;
    private int may;
    private int june;
    private int july;
    private int august;
    private int september;
    private int october;
    private int november;
    private int december;
    private String januaryJustification;
    private String februaryJustification;
    private String marchJustification;
    private String aprilJustification;
    private String mayJustification;
    private String juneJustification;
    private String julyJustification;
    private String augustJustification;
    private String septemberJustification;
    private String octoberJustification;
    private String novemberJustification;
    private String decemberJustification;
    public int getCustomProjectKPIYearId() {
        return customProjectKPIYearId;
    }
    public void setCustomProjectKPIYearId(int customProjectKPIYearId) {
        this.customProjectKPIYearId = customProjectKPIYearId;
    }
    public int getCustomKpiId() {
        return customKpiId;
    }
    public void setCustomKpiId(int customKpiId) {
        this.customKpiId = customKpiId;
    }
    public int getProjectId() {
        return projectId;
    }
    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
    public int getCustomKpiThreshold() {
        return customKpiThreshold;
    }
    public void setCustomKpiThreshold(int customKpiThreshold) {
        this.customKpiThreshold = customKpiThreshold;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public int getJanuary() {
        return january;
    }
    public void setJanuary(int january) {
        this.january = january;
    }
    public int getFebruary() {
        return february;
    }
    public void setFebruary(int february) {
        this.february = february;
    }
    public int getMarch() {
        return march;
    }
    public void setMarch(int march) {
        this.march = march;
    }
    public int getApril() {
        return april;
    }
    public void setApril(int april) {
        this.april = april;
    }
    public int getMay() {
        return may;
    }
    public void setMay(int may) {
        this.may = may;
    }
    public int getJune() {
        return june;
    }
    public void setJune(int june) {
        this.june = june;
    }
    public int getJuly() {
        return july;
    }
    public void setJuly(int july) {
        this.july = july;
    }
    public int getAugust() {
        return august;
    }
    public void setAugust(int august) {
        this.august = august;
    }
    public int getSeptember() {
        return september;
    }
    public void setSeptember(int september) {
        this.september = september;
    }
    public int getOctober() {
        return october;
    }
    public void setOctober(int october) {
        this.october = october;
    }
    public int getNovember() {
        return november;
    }
    public void setNovember(int november) {
        this.november = november;
    }
    public int getDecember() {
        return december;
    }
    public void setDecember(int december) {
        this.december = december;
    }
    public String getJanuaryJustification() {
        return januaryJustification;
    }
    public void setJanuaryJustification(String januaryJustification) {
        this.januaryJustification = januaryJustification;
    }
    public String getFebruaryJustification() {
        return februaryJustification;
    }
    public void setFebruaryJustification(String februaryJustification) {
        this.februaryJustification = februaryJustification;
    }
    public String getMarchJustification() {
        return marchJustification;
    }
    public void setMarchJustification(String marchJustification) {
        this.marchJustification = marchJustification;
    }
    public String getAprilJustification() {
        return aprilJustification;
    }
    public void setAprilJustification(String aprilJustification) {
        this.aprilJustification = aprilJustification;
    }
    public String getMayJustification() {
        return mayJustification;
    }
    public void setMayJustification(String mayJustification) {
        this.mayJustification = mayJustification;
    }
    public String getJuneJustification() {
        return juneJustification;
    }
    public void setJuneJustification(String juneJustification) {
        this.juneJustification = juneJustification;
    }
    public String getJulyJustification() {
        return julyJustification;
    }
    public void setJulyJustification(String julyJustification) {
        this.julyJustification = julyJustification;
    }
    public String getAugustJustification() {
        return augustJustification;
    }
    public void setAugustJustification(String augustJustification) {
        this.augustJustification = augustJustification;
    }
    public String getSeptemberJustification() {
        return septemberJustification;
    }
    public void setSeptemberJustification(String septemberJustification) {
        this.septemberJustification = septemberJustification;
    }
    public String getOctoberJustification() {
        return octoberJustification;
    }
    public void setOctoberJustification(String octoberJustification) {
        this.octoberJustification = octoberJustification;
    }
    public String getNovemberJustification() {
        return novemberJustification;
    }
    public void setNovemberJustification(String novemberJustification) {
        this.novemberJustification = novemberJustification;
    }
    public String getDecemberJustification() {
        return decemberJustification;
    }
    public void setDecemberJustification(String decemberJustification) {
        this.decemberJustification = decemberJustification;
    }
    public CustomProjectKPIYearMapping() {
    }
    public CustomProjectKPIYearMapping(int customProjectKPIYearId, int customKpiId, int projectId,
            int customKpiThreshold, int year, int january, int february, int march, int april, int may, int june,
            int july, int august, int september, int october, int november, int december, String januaryJustification,
            String februaryJustification, String marchJustification, String aprilJustification, String mayJustification,
            String juneJustification, String julyJustification, String augustJustification,
            String septemberJustification, String octoberJustification, String novemberJustification,
            String decemberJustification) {
        this.customProjectKPIYearId = customProjectKPIYearId;
        this.customKpiId = customKpiId;
        this.projectId = projectId;
        this.customKpiThreshold = customKpiThreshold;
        this.year = year;
        this.january = january;
        this.february = february;
        this.march = march;
        this.april = april;
        this.may = may;
        this.june = june;
        this.july = july;
        this.august = august;
        this.september = september;
        this.october = october;
        this.november = november;
        this.december = december;
        this.januaryJustification = januaryJustification;
        this.februaryJustification = februaryJustification;
        this.marchJustification = marchJustification;
        this.aprilJustification = aprilJustification;
        this.mayJustification = mayJustification;
        this.juneJustification = juneJustification;
        this.julyJustification = julyJustification;
        this.augustJustification = augustJustification;
        this.septemberJustification = septemberJustification;
        this.octoberJustification = octoberJustification;
        this.novemberJustification = novemberJustification;
        this.decemberJustification = decemberJustification;
    }
    
    
    
}

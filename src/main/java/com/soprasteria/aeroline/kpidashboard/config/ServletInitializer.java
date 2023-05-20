package com.soprasteria.aeroline.kpidashboard.config;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.soprasteria.aeroline.kpidashboard.KpiDashboardApplication;

public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(KpiDashboardApplication.class);
	}

}

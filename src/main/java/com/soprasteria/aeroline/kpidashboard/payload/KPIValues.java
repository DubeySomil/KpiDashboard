package com.soprasteria.aeroline.kpidashboard.payload;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class KPIValues {
    private HashMap<String, Integer> values = new HashMap<String,Integer>();

	public HashMap<String, Integer> getValues() {
		return values;
	}

	public void setValues(HashMap<String, Integer> values) {
		this.values = values;
	}

	public KPIValues(HashMap<String, Integer> values) {
		super();
		this.values = values;
	}

	public KPIValues() {
		super();
		// TODO Auto-generated constructor stub
	}

	
    
    
}

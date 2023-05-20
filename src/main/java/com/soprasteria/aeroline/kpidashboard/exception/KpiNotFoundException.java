package com.soprasteria.aeroline.kpidashboard.exception;

public class KpiNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    String resourceName;
    String fieldName;
    int fieldValue;

    public KpiNotFoundException(String resourceName, String fieldName, int fieldValue) {
        super(String.format("%s not found with %s : %s", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}

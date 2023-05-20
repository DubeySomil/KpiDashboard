package com.soprasteria.aeroline.kpidashboard.exception;

public class RoleNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    String resourceName;
    String fieldName;
    int fieldValue;

    public RoleNotFoundException(String resourceName, String fieldName, int fieldValue) {
        super(String.format("%s not found with %s : %s", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}

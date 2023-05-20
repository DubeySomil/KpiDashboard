package com.soprasteria.aeroline.kpidashboard.exception;

public class UserNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    String resourceName;
    String fieldName;
    String fieldValue;

    public UserNotFoundException(String resourceName, String fieldName, String fieldValue) {
        super(String.format("%s not found with %s : %s", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

}

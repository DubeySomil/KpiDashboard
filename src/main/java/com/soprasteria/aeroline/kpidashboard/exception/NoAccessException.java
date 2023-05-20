package com.soprasteria.aeroline.kpidashboard.exception;

public class NoAccessException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public NoAccessException() {
        super("Please contact administrator");
    }
}

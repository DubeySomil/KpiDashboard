package com.soprasteria.aeroline.kpidashboard.exception;

public class InvalidPasswordException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public InvalidPasswordException() {
        super("Invalid Username or Password!");
    }
}

package com.soprasteria.aeroline.kpidashboard.exception;

public class WrongPasswordInputException extends RuntimeException {
  
	  private static final long serialVersionUID = 1L;
	 
	 public  WrongPasswordInputException() {
	        super("Sorry! you entered wrong password for your account");
	       
	    }

}

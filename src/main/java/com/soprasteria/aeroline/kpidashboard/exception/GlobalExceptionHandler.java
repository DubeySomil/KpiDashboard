package com.soprasteria.aeroline.kpidashboard.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.soprasteria.aeroline.kpidashboard.entity.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> userNotFoundExceptionHandler(UserNotFoundException ex) {
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(message, false);

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(ProjectNotFoundException.class)
    public ResponseEntity<ApiResponse> projectNotFoundExceptionHandler(ProjectNotFoundException ex) {
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(message, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(KpiNotFoundException.class)
    public ResponseEntity<ApiResponse> kpiNotFoundExceptionHandler(KpiNotFoundException ex) {
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(message, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(KpiYearNotFoundException.class)
    public ResponseEntity<ApiResponse> kpiYearNotFoundExceptionHandler(KpiYearNotFoundException ex) {
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(message, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<ApiResponse> RoleNotFoundExceptionHandler(RoleNotFoundException ex) {
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(message, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ApiResponse> invalidPasswordExceptionHandler(InvalidPasswordException ex) {
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(message, false);

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(NoAccessException.class)
    public ResponseEntity<ApiResponse> noAccessExceptionHandler(NoAccessException ex) {
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(message, false);

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_ACCEPTABLE);

    }
    
    @ExceptionHandler(WrongPasswordInputException.class)
    public ResponseEntity<ApiResponse> WrongPasswordInputExceptionHandler(WrongPasswordInputException ex){
    	String message = ex.getMessage();
    	ApiResponse apiResponse = new ApiResponse(message,false);
    	return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.NOT_ACCEPTABLE);
    }
    
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ApiResponse> UsernameExistExceptionHandler(ResourceAlreadyExistsException ex){
    	String message = ex.getMessage();
    	ApiResponse apiResponse = new ApiResponse(message,false);
    	return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.NOT_ACCEPTABLE);
    }
}

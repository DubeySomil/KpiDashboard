package com.soprasteria.aeroline.kpidashboard.payload;

public class PasswordUpdateDTO {
 
	 private String oldpassword;
	 private String password;
	public String getOldpassword() {
		return oldpassword;
	}
	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public PasswordUpdateDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PasswordUpdateDTO(String oldpassword, String password) {
		super();
		this.oldpassword = oldpassword;
		this.password = password;
	}
	 
}

package com.soprasteria.aeroline.kpidashboard.payload;

public class EmailRequest {
	private String to;
	private String subject;
	private String message;
	private String content;
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public EmailRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public EmailRequest(String to, String subject, String message, String content) {
		super();
		this.to = to;
		this.subject = subject;
		this.message = message;
		this.content = content;
	}
	@Override
	public String toString() {
		return "EmailRequest [to=" + to + ", subject=" + subject + ", message=" + message + ", content=" + content
				+ "]";
	}
	
	
	
}


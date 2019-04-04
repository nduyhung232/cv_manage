package com.example.demo.model;

public class Account {
	private int id;
	private String userName;
	private String passWord;
	private String name;
	private String phoneNumber;
	private String idDonVi;
	private String donVi;
	private int status;

	public Account() {
	}

	public Account(int id, String userName, String passWord, String name, String phoneNumber, String donVi, int status, String idDonVi) {
		this.id = id;
		this.userName = userName;
		this.passWord = passWord;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.donVi = donVi;
		this.status = status;
		this.idDonVi = idDonVi;
	}

	public String getIdDonVi() {
		return idDonVi;
	}

	public void setIdDonVi(String idDonVi) {
		this.idDonVi = idDonVi;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {

		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getDonVi() {
		return donVi;
	}

	public void setDonVi(String donVi) {
		this.donVi = donVi;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Account{" +
				"id=" + id +
				", userName='" + userName + '\'' +
				", passWord='" + passWord + '\'' +
				", name='" + name + '\'' +
				", phoneNumber='" + phoneNumber + '\'' +
				", donVi=" + donVi +
				", status=" + status +
				'}';
	}
}
package com.google.devrel.training.conference.form;

public class ProfileForm {

	private String name;

	private ProfileForm() {
	}

	public ProfileForm(String name, String surname) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

}
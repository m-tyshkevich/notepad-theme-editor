package com.google.devrel.training.conference.domain;

import java.util.ArrayList;
import java.util.List;

import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;


//TODO indicate that this class is an Entity
	 @Entity
	 @Cache
public class Profile {

	String name;
	String mainEmail;

	 @Id
	String userId;

	public Profile(String userId, String name, String mainEmail) {

		this.userId = userId;
		this.name = name;
		this.mainEmail = mainEmail;

	}

	public String getName() {
		return name;
	}


	public String getMainEmail() {
		return mainEmail;
	}


	public String getUserId() {
		return userId;
	}

	
	private Profile() {
	}

	public void update(String name) {
		if (name != null) 
			this.name = name;
	}

}
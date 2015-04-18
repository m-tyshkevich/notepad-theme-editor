package com.google.devrel.training.conference.spi;

import static com.google.devrel.training.conference.service.OfyService.factory;
import static com.google.devrel.training.conference.service.OfyService.ofy;

import java.util.List;

import javax.inject.Named;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.response.NotFoundException;
import com.google.api.server.spi.response.UnauthorizedException;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.users.User;
import com.google.common.base.Preconditions;
import com.google.devrel.training.conference.Constants;
import com.google.devrel.training.conference.domain.Profile;
import com.google.devrel.training.conference.form.ProfileForm;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Work;

/**
 * Defines Fears'Breaker APIs.
 */
@Api(name = "themeeditor", version = "v1", scopes = { Constants.EMAIL_SCOPE }, clientIds = {
		Constants.WEB_CLIENT_ID, Constants.ANDROID_CLIENT_ID,
		Constants.IOS_CLIENT_ID, Constants.API_EXPLORER_CLIENT_ID }, audiences = { Constants.ANDROID_AUDIENCE })
public class EditorApi {

	private static String extractDefaultDisplayNameFromEmail(String email) {
		return email == null ? null : email.substring(0, email.indexOf("@"));
	}

	// create and save profile
		@ApiMethod(name = "saveProfile", path = "saveProfile", httpMethod = HttpMethod.POST)
		public Profile saveProfile(final User user, ProfileForm profileForm)
				throws UnauthorizedException {

			if (user == null) {
				throw new UnauthorizedException("Authorization required");
			}

			String mainEmail = user.getEmail();
			String userId = user.getUserId();

			String name = profileForm.getName();

			// Get the Profile from the datastore if it exists
			// otherwise create a new one
			Profile profile = ofy().load().key(Key.create(Profile.class, userId))
					.now();

			if (profile == null) {
				// Populate the atributes with default values
				// if not sent in the request
				if (name == null) {
					name = extractDefaultDisplayNameFromEmail(user.getEmail());
				}
				//creating profile entity
				profile = new Profile(userId, name, mainEmail);
			} else {
				// The Profile entity already exists
				// Update the Profile entity
				profile.update(name);
			}

			// Save the entity in the datastore
			ofy().save().entity(profile).now();

			// Return the profile
			return profile;
		}

		@ApiMethod(name = "getProfile", path = "getProfile", httpMethod = HttpMethod.GET)
		public Profile getProfile(final User user) throws UnauthorizedException {
			if (user == null) {
				throw new UnauthorizedException("Authorization required");
			}

			// load the Profile Entity
			String userId = user.getUserId();
			Key key = Key.create(Profile.class, userId);

			Profile profile = (Profile) ofy().load().key(key).now();
			return profile;
		}

		private static Profile getProfileFromUser(User user) {
			// First fetch the user's Profile from the datastore.
			Profile profile = ofy().load()
					.key(Key.create(Profile.class, user.getUserId())).now();
			if (profile == null) {
				// Create a new Profile if it doesn't exist.
				// Use default displayName and teeShirtSize
				String email = user.getEmail();

				profile = new Profile(user.getUserId(),
						extractDefaultDisplayNameFromEmail(email), email);
			}
			return profile;
		}

}
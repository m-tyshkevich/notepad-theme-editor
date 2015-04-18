'use strict';

var themeEditorApp = themeEditorApp || {};

themeEditorApp.controllers = angular.module('editorControllers', [ 'ui.bootstrap' ]);

/**
 * @ngdoc controller
 * @name RootCtrl
 * 
 * @description The root controller having a scope of the body element and
 *              methods used in the application wide such as user
 *              authentications.
 * 
 */
themeEditorApp.controllers.controller('RootCtrl', function($scope, $location,
		oauth2Provider) {

//	Returns true if the viewLocation is the currently viewed page.
	$scope.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};

//	Returns the OAuth2 signedIn state.
	$scope.getSignedInState = function() {
		return oauth2Provider.signedIn;
	};

//	Calls the OAuth2 authentication method.
	$scope.signIn = function() {
		oauth2Provider.signIn(function() {
			gapi.client.oauth2.userinfo.get().execute(function(resp) {
				$scope.$apply(function() {
					if (resp.email) {
						oauth2Provider.signedIn = true;
						$scope.alertStatus = 'success';
						$scope.rootMessages = 'Logged in with ' + resp.email;
					}
				});
			});
		});
	};

	
	$scope.initSignInButton = function() {
		gapi.signin.render('signInButton', {
			'callback' : function() {
				jQuery('#signInButton button').attr('disabled', 'true').css(
						'cursor', 'default');
				if (gapi.auth.getToken() && gapi.auth.getToken().access_token) {
					$scope.$apply(function() {
						oauth2Provider.signedIn = true;
					});
				}
			},
			'clientid' : oauth2Provider.CLIENT_ID,
			'cookiepolicy' : 'single_host_origin',
			'scope' : oauth2Provider.SCOPES
		});
	};

//	Logs out the user
	$scope.signOut = function() {
		oauth2Provider.signOut();
		$scope.alertStatus = 'success';
		$scope.rootMessages = 'Logged out';
	};

//	Collapses the navbar on mobile devices.
	$scope.collapseNavbar = function() {
		angular.element(document.querySelector('.navbar-collapse'))
				.removeClass('in');
	};

});
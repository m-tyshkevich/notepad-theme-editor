"use strict";

var app = angular.module('themeEditorApp',
	    ['editorControllers', 'ngRoute', 'ui.bootstrap']).
	    config(['$routeProvider',
	        function ($routeProvider) {
	            $routeProvider.
	                when('/about', {
	                    templateUrl: '/partials/about.html',
	                    controller: 'AboutCrtl'
	                }).
	                when('/editor2', {
	                    templateUrl: '/partials/theditor.html',
	                    controller: 'EditorCtrl'
	                }).
	                when('/', {
	                    templateUrl: '/partials/home.html'
	                }).
	                otherwise({
	                    redirectTo: '/'
	                });
	        }]);


var app = angular.module('themeEditorApp',
    ['editorControllers', 'ngRoute', 'ui.bootstrap']).
    config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'index.html',
                    controller: 'RootCtrl'
                })
                .when('/editor', {
                    templateUrl: 'editor.html',
                    controller: ''
                })
                .when('/about', {
                    templateUrl: '/partials/about.html',
                    controller: 'AboutCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);


app.filter('startFrom', function () {
    var filter = function (data, start) {
        return data.slice(start);
    }
    return filter;
});


app.constant('HTTP_ERRORS', {
    'UNAUTHORIZED': 401
});

app.factory('oauth2Provider', function ($modal) {
    var oauth2Provider = {
        CLIENT_ID: '107452284729-1dimd8i8mj5hv641276cl3a20qvk1eqd.apps.googleusercontent.com',
        SCOPES: 'https://www.googleapis.com/auth/userinfo.email profile',
        signedIn: false
    };


// 	Calls the OAuth2 authentication method.
    oauth2Provider.signIn = function (callback) {
        gapi.auth.signIn({
            'clientid': oauth2Provider.CLIENT_ID,
            'cookiepolicy': 'single_host_origin',
            'accesstype': 'online',
            'approveprompt': 'auto',
            'scope': oauth2Provider.SCOPES,
            'callback': callback
        });
        //from controllers.js
       	oauth2Provider.signedIn = true;
    };

//	Logs out the user.
    oauth2Provider.signOut = function () {
        gapi.auth.signOut();
        // Explicitly set the invalid access token in order to make the API calls fail.
        gapi.auth.setToken({access_token: ''})
        oauth2Provider.signedIn = false;
    };

//	Shows the modal with Google+ sign in button.

    oauth2Provider.showLoginModal = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/login.modal.html',
            controller: 'OAuth2LoginModalCtrl'
        });
        return modalInstance;
    };

    return oauth2Provider;
});
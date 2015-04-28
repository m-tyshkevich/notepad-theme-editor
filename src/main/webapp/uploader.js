/*
 * http://stackoverflow.com/questions/18260815/use-gapi-client-javascript-to-execute-my-custom-google-api
 * https://developers.google.com/appengine/docs/java/endpoints/consume_js
 * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientload
 *
 */

/**
 * After the client library has loaded, this init() function is called.
 * The init() function loads the uploaderendpoints API.
 */

function init() {
	
	// You need to pass the root path when you load your API
	// otherwise calls to execute the API run into a problem
	
	// rootpath will evaulate to either of these, depending on where the app is running:
	// //localhost:8080/_ah/api
	// //your-app-id/_ah/api

	var rootpath = "//" + window.location.host + "/_ah/api";
	
	// Load the uploaderendpoints API
	// If loading completes successfully, call loadCallback function
	gapi.client.load('uploaderendpoints', 'v1', loadCallback, rootpath);
}

/*
 * When uploaderendpoints API has loaded, this callback is called.
 * 
 * We need to wait until the uploaderendpoints API has loaded to
 * enable the actions for the buttons in index.html,
 * because the buttons call functions in the uploaderendpoints API
 */
function loadCallback () {	
	// Enable the button actions
	enableButtons ();
}

function enableButtons () {
	
	
	// Set the onclick action for the second button
	btn = document.getElementById("input_save");
	btn.onclick=function(){uploadToCloud(document.querySelector('#name_field').value,  document.querySelector('#modifiedText').value);};
	
	// Update the button label now that the button is active
	btn.value="Save to cloud";
	

	
	
}



/*
 * Execute a request to the sayHelloByName() endpoints function.
 * Illustrates calling an endpoints function that takes an argument.
 */
function uploadToCloud (name, content) {
	
	var request = gapi.client.uploaderendpoints.uploadToCloud({'name': name, 'content': content});
	request.execute(callback);
}

// Process the JSON response
// In this case, just show an alert dialog box
// displaying the value of the message field in the response
function callback (response) {
	alert(response.message);	
}






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
	btn.onclick=function(){uploadToCloud(document.querySelector('#name_field').value);};
	
	// Update the button label now that the button is active
	btn.value="Save to cloud";
	
	// Set the onclick action for the second button
	btn = document.getElementById("load_by_name");
	btn.onclick=function(){loadFromCloud(document.querySelector('#search_field').value);};
	
	// Update the button label now that the button is active
	btn.value="Load from cloud";
	

	
	
}



/*
 * Execute a request to the sayHelloByName() endpoints function.
 * Illustrates calling an endpoints function that takes an argument.
 */
function uploadToCloud (name) {
	//var one = document.getElementById(out_p43).value;
	//var two = document.getElementById(out_p44).value;
	//var three = document.getElementById(out_p45).value;
	//var four = document.getElementById(out_p46).value;
	//var five = document.getElementById(out_p47).value;
	//var six = document.getElementById(out_p48).value;
	//var seven = document.getElementById(out_p49).value;
	//var eight = document.getElementById(out_p50).value;
	//var nine = document.getElementById(out_p51).value;
	//var ten = document.getElementById(out_p52).value;
	//var eleven = document.getElementById(out_p53).value;
	
	var content = (document.getElementById('out_p43').value + " "+ document.getElementById('out_p44').value + " "+ document.getElementById('out_p45').value + " "+ document.getElementById('out_p46').value + " "+ document.getElementById('out_p47').value + " "+ document.getElementById('out_p48').value + " "+ document.getElementById('out_p49').value + " "+ document.getElementById('out_p50').value + " "+ document.getElementById('out_p51').value + " "+ document.getElementById('out_p52').value + " "+ document.getElementById('out_p53').value);
	//var request = gapi.client.uploaderendpoints.uploadToCloud({'name': name, 'one': one, 'one': one, 'one': one, 'one': one, 'five': five, 'six': six, 'seven': seven, 'eight': eight, 'nine': nine, 'ten': ten, 'eleven': eleven});
	var request = gapi.client.uploaderendpoints.uploadToCloud({'name': name, 'content': content});
	request.execute(callback);
}

function loadFromCloud (name) {
	
	var request = gapi.client.uploaderendpoints.loadFromCloud({'name': name});
	request.execute(replace);
}

// Process the JSON response
// In this case, just show an alert dialog box
// displaying the value of the message field in the response
function callback (response) {
//	document.getElementById('modifiedText').value = response.message;
	alert(response.message);	
}


function replace (response) {
	//document.getElementById('modifiedText').value = response.message;
	
	
	//edits the 11 lower textareas
	
	var result = response.message;
	for(var i = 0; i<=78; i+=7){
	document.getElementById("out_p"+(i/7+43)).value = result.substring(i, i+6);	
	}
	
}



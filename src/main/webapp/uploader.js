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

	makeList();
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
	var s = 1;
	//while(true){
		btn = document.getElementById(('dynobutton1'));
		//if (myElem == null) break;
		//btn = myElem;
		btn.onclick=function(){loadFromCloud(document.querySelector(('Label1')).value);};
		s++;
		
	//}
	
	
}

function makeList () {
	var name = "ThemeList";
	var request = gapi.client.uploaderendpoints.makeList({'name': name});
	
	request.execute(changeList);
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
	
	//refreshes, hopefully
	var container = document.getElementById("Dynolist");
	   var con = container.innerHTML;
	   container.innerHTML = con;
}

function loadFromCloud (name) {
	
	var request = gapi.client.uploaderendpoints.loadFromCloud({'name': name});
	request.execute(replace);
	replaceAllCharacters();
}

// Process the JSON response
// In this case, just show an alert dialog box
// displaying the value of the message field in the response
function callback (response) {
	alert(response.message);	
}

function changeList (response) {
	//document.getElementById('modifiedText').value = list;	
	var list = response.message;
	
	var str = "<ul class='Dynamic list' id = 'Dynolist' >";

	
	   

	
	list = list.substring(0, list.length-1);
	var n = 1;
	while(list.indexOf("|")!=-1){
		var k = list.indexOf("|");
		var temp = list.substring(0, k);
		
		str += '<li><label id = "label1" >';
		//str+=n;
		//str+='">';
		str+= temp;
		str+='</label>';
		//str+'<input id = "dynobutton1" type="button" value="Import" onclick="will_be_set_after_endpoints_apis_loaded">';
		//str+=n+'" ';
		//str+= 'type="button" value="Import" onclick="will_be_set_after_endpoints_apis_loaded">';
		str+=	'</li>';
		list = list.substring(k+1, list.length);
		n++;

		
		
		
		
	}
	str += '<li><label id = "label';
	str+=n;
	str+='">';
	str+= list;
	str+='</label>';
	//str+'<input id="dynobutton';
	//str+=n+'" ';
	//str+= 'type="button" value="Import" onclick="will_be_set_after_endpoints_apis_loaded">';
	
	str+=	'</li>';
	str += '</ul>';
	$('#place_for_list').append(str);
}


function replace (response) {
	//document.getElementById('modifiedText').value = response.message;
	
	
	//edits the 11 lower textareas
	
	var result = response.message;
	for(var i = 0; i<=78; i+=7){
	document.getElementById("out_p"+(i/7+43)).value = result.substring(i, i+6);	
	}

	//replaceAllCharacters();
	
}

function replaceAllCharacters(){
	
	var origContent = document.getElementById("template_textarea").value;
	var inLine_43 = "<WordsStyle name=\"DEFAULT\" styleID=\"41\" fgColor=\""+document.form1.in_p43.value;
	var outLine_43 = "<WordsStyle name=\"DEFAULT\" styleID=\"41\" fgColor=\""+document.form1.out_p43.value;
	var newString_43 = origContent.split(inLine_43);
	newString_43 = newString_43.join(outLine_43);
	document.getElementById("modifiedText").value = newString_43;
	document.getElementById("template_textarea").value = newString_43;
	document.form1.in_p43.value = document.form1.out_p43.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_44 = "<WordsStyle name=\"NUMBER\" styleID=\"45\" fgColor=\""+document.form1.in_p44.value;
	outLine_44 = "<WordsStyle name=\"NUMBER\" styleID=\"45\" fgColor=\""+document.form1.out_p44.value;
	newString_44 = origContent.split(inLine_44);
	newString_44 = newString_44.join(outLine_44);
	document.getElementById("modifiedText").value = newString_44;
	document.getElementById("template_textarea").value = newString_44;
	document.form1.in_p44.value = document.form1.out_p44.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_45 = "<WordsStyle name=\"WORD\" styleID=\"46\" fgColor=\""+document.form1.in_p45.value;
	outLine_45 = "<WordsStyle name=\"WORD\" styleID=\"46\" fgColor=\""+document.form1.out_p45.value;
	newString_45 = origContent.split(inLine_45);
	newString_45 = newString_45.join(outLine_45);
	document.getElementById("modifiedText").value = newString_45;
	document.getElementById("template_textarea").value = newString_45;
	document.form1.in_p45.value = document.form1.out_p45.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_46 = "<WordsStyle name=\"KEYWORD\" styleID=\"47\" fgColor=\""+document.form1.in_p46.value;
	outLine_46 = "<WordsStyle name=\"KEYWORD\" styleID=\"47\" fgColor=\""+document.form1.out_p46.value;
	newString_46 = origContent.split(inLine_46);
	newString_46 = newString_46.join(outLine_46);
	document.getElementById("modifiedText").value = newString_46;
	document.getElementById("template_textarea").value = newString_46;
	document.form1.in_p46.value = document.form1.out_p46.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_47 = "<WordsStyle name=\"DOUBLESTRING\" styleID=\"48\" fgColor=\""+document.form1.in_p47.value;
	outLine_47 = "<WordsStyle name=\"DOUBLESTRING\" styleID=\"48\" fgColor=\""+document.form1.out_p47.value;
	newString_47 = origContent.split(inLine_47);
	newString_47 = newString_47.join(outLine_47);
	document.getElementById("modifiedText").value = newString_47;
	document.getElementById("template_textarea").value = newString_47;
	document.form1.in_p47.value = document.form1.out_p47.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_48 = "<WordsStyle name=\"SINGLESTRING\" styleID=\"49\" fgColor=\""+document.form1.in_p48.value;
	outLine_48 = "<WordsStyle name=\"SINGLESTRING\" styleID=\"49\" fgColor=\""+document.form1.out_p48.value;
	newString_48 = origContent.split(inLine_48);
	newString_48 = newString_48.join(outLine_48);
	document.getElementById("modifiedText").value = newString_48;
	document.getElementById("template_textarea").value = newString_48;
	document.form1.in_p48.value = document.form1.out_p48.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_49 = "<WordsStyle name=\"SYMBOLS\" styleID=\"50\" fgColor=\""+document.form1.in_p49.value;
	outLine_49 = "<WordsStyle name=\"SYMBOLS\" styleID=\"50\" fgColor=\""+document.form1.out_p49.value;
	newString_49 = origContent.split(inLine_49);
	newString_49 = newString_49.join(outLine_49);
	document.getElementById("modifiedText").value = newString_49;
	document.getElementById("template_textarea").value = newString_49;
	document.form1.in_p49.value = document.form1.out_p49.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_50 = "<WordsStyle name=\"REGEX\" styleID=\"52\" fgColor=\""+document.form1.in_p50.value;
	outLine_50 = "<WordsStyle name=\"REGEX\" styleID=\"52\" fgColor=\""+document.form1.out_p50.value;
	newString_50 = origContent.split(inLine_50);
	newString_50 = newString_50.join(outLine_50);
	document.getElementById("modifiedText").value = newString_50;
	document.getElementById("template_textarea").value = newString_50;
	document.form1.in_p50.value = document.form1.out_p50.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_51 = "<WordsStyle name=\"COMMENT\" styleID=\"42\" fgColor=\""+document.form1.in_p51.value;
	outLine_51 = "<WordsStyle name=\"COMMENT\" styleID=\"42\" fgColor=\""+document.form1.out_p51.value;
	newString_51 = origContent.split(inLine_51);
	newString_51 = newString_51.join(outLine_51);
	document.getElementById("modifiedText").value = newString_51;
	document.getElementById("template_textarea").value = newString_51;
	document.form1.in_p51.value = document.form1.out_p51.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_52 = "<WordsStyle name=\"COMMENTLINE\" styleID=\"43\" fgColor=\""+document.form1.in_p52.value;
	outLine_52 = "<WordsStyle name=\"COMMENTLINE\" styleID=\"43\" fgColor=\""+document.form1.out_p52.value;
	newString_52 = origContent.split(inLine_52);
	newString_52 = newString_52.join(outLine_52);
	document.getElementById("modifiedText").value = newString_52;
	document.getElementById("template_textarea").value = newString_52;
	document.form1.in_p52.value = document.form1.out_p52.value;
	
	origContent = document.getElementById("template_textarea").value;
	inLine_53 = "<WordsStyle name=\"COMMENTDOC\" styleID=\"44\" fgColor=\""+document.form1.in_p53.value;
	outLine_53 = "<WordsStyle name=\"COMMENTDOC\" styleID=\"44\" fgColor=\""+document.form1.out_p53.value;
	newString_53 = origContent.split(inLine_53);
	newString_53 = newString_53.join(outLine_53);
	document.getElementById("modifiedText").value = newString_53;
	document.getElementById("template_textarea").value = newString_53;
	document.form1.in_p53.value = document.form1.out_p53.value;
}

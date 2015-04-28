$(document).ready(function(){
	//alert("I'm here");
	if (checkIfLoggedIn()){
		$('#hide-when-logged-out').show();
		$('#signInLink').hide();
		$('#signOutLink').show();
	} else {
		$('#hide-when-logged-out').hide();
		$('#signInLink').show();
		$('#signOutLink').hide();
	}
	$('#signInLink').click(function(){
		setCookie("loggedin", "true");
		$('#signInLink').hide();
		$('#signOutLink').show();
	});
	$('#signOutLink').click(function(){
		setCookie("loggedin", "false");
		$('#signInLink').show();
		$('#signOutLink').hide();
	});
});

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
	var nameEQ = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0){
        	return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

function checkIfLoggedIn() {
	if (getCookie("loggedin")=="true"){
		//alert("Logged in");
		return true;
	} else {
		//alert("Not logged in, loggedin = " + getCookie("loggedin"));
		return false;
	}
}
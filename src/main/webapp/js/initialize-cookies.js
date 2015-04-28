$(document).ready(function(){
	if (getCookie("beenHere") != "yes"){
		setCookie("loggedin", "false");
		setCookie("beenHere", "yes");
	}
	if (getCookie("loggedin") != "true"){
		setCookie("loggedin", "false");
		setCookie("username", "none");
	}
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

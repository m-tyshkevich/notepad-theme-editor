$(document).ready(function(){
    $(".button").mouseenter(function(){
    	$(this).css("color", "#ffffff");
    	$(this).css("border", "5px solid #ffffff");
    	$(this).children("a").css("color", "#ffffff");
    });
});

$(document).ready(function(){
    $(".button").mouseleave(function(){
    	$(this).css("color", "#919191");
    	$(this).css("border", "5px solid #919191");
    	$(this).children("a").css("color", "#919191");
    });
});

$(document).ready(function(){
    $(".link").mouseenter(function(){
    	$(this).css("color", "#ffffff");
    	$(this).children("a").css("color", "#ffffff");
    });
    $(".link").mouseleave(function(){
    	$(this).css("color", "#919191");
    	$(this).children("a").css("color", "#919191");
    });
});


$(document).ready(function(){
    $("#to-editor").click(function(){
    	window.location.href = "/editor.html";
    });
});
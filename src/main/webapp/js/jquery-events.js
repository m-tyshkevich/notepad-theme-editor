$(document).ready(function(){
    $(".button").mouseenter(function(){
    	$(this).css("color", "#ffffff");
    	$(this).css("border", "5px solid #ffffff");
    });
});

$(document).ready(function(){
    $(".button").mouseleave(function(){
    	$(this).css("color", "#dddddd");
    	$(this).css("border", "5px solid #dddddd");
    });
});
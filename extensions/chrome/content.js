
function onClosePopup(event) {
		$('.dialogbox').css('display','none');
}



var div = document.createElement("div");
div.className = "dialogbox";
div.style.cssText = "width:100px; height:100px; background:grey;display:none";
div.src = "<div class=\"dialogcontent\"> This is Dialogue box</div><a id=\"click\">click here</a>";

//document.body.appendChild( div );
$('body').append(div);


/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(onPopup(request.args));
});
*/

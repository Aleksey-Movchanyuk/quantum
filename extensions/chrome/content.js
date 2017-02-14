hideQuantumTextEditor = function() {
		$('.quantum-text-editor-popup').css('display','none');
}

popupQuantumTextEditor = function() {
		$('.quantum-text-editor-popup').css('display','block');
}


/*
var div = document.createElement("div");
div.className = "dialogbox";
div.style.cssText = "width:100px; height:100px; background:grey;display:none";
div.src = "<div class=\"dialogcontent\"> This is Dialogue box</div><a id=\"click\">click here</a>";
*/

var url = chrome.extension.getURL('frame.html');
var iframe = "<iframe src='" + url + "' class='quantum-text-editor-popup' style=\"display:none;opacity:1;\" frameBorder=\"0\"></iframe>";

//document.body.appendChild( div );

$('body').append(iframe);

/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(onPopup(request.args));
});
*/


/*
QuantumEngine.close = function() {
	this.end();
	chrome.runtime.sendMessage({action: "close"});
}

QuantumEngine._getArguments = function() {
	return {
		css: chrome.extension.getURL("common/css/quantum-core.css"),
		iframe: chrome.extension.getURL("frame.html")
	};
}
*/

QuantumEngine = {

	actionHandler: function(data, sender, sendResponse) {
		if (typeof sender != 'undefined')
			if (!sender.tab)
				switch(data.action){

          case 'popupQuantumTextEditor':
    				popupQuantumTextEditor();
    				break;

    			case 'hideQuantumTextEditorPopup':
    				hideQuantumTextEditor();
    				break;

		}
		return true;
	}
}


//messages from background js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	return QuantumEngine.actionHandler(request, sender, sendResponse);
});


//messages from iframe
window.addEventListener("message", function (e) {
	QuantumEngine.actionHandler({params: e.data.params, action: e.data.action});
});

/*
chrome.runtime.sendMessage({action: "desktopAppRun"});
*/







//messages from background js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	return QuantumTextEditorEngine.actionHandler(request, sender, sendResponse);
});


//messages from iframe
window.addEventListener("message", function (e) {
	QuantumTextEditorEngine.actionHandler({params: e.data.params, action: e.data.action});
});


/*
chrome.runtime.sendMessage({action: "desktopAppRun"});
*/

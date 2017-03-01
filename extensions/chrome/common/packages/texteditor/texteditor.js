
function getCurrentQuantumText() {
  return $('.quantum-text-area').val();
}

function setCurrentQuantumText(evt) {

  //if (evt.origin == "http://quantum.ai") {
    $('.quantum-text-area').val(evt.data);
  //}
}


// messages from content.js
if (window.addEventListener) {
	// For standards-compliant web browsers
	window.addEventListener("message", setCurrentQuantumText, false);
}
else {
	window.attachEvent("onmessage", setCurrentQuantumText);
}



// messages to background.js
$(document).ready(function() {

  // Close Button
  $(".quantum-text-editor-close-btn").click(function () {
    chrome.extension.sendMessage({action: 'hideQuantumTextEditorPopup'})
  });

  // Submit Button
  $(".quantum-text-editor-submit-btn").click(function () {
    chrome.extension.sendMessage({action: 'submitQuantumTextEditorPopup', text: getCurrentQuantumText()});
  });

});


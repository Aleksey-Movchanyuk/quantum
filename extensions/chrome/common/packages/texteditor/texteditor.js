
function getCurrentQuantumText() {
  return $('.quantum-text-area').val();
}

function setCurrentQuantumText(text) {
  $('.quantum-text-area').val(text);
}


// messages to background.js
$(document).ready(function() {

  // Copy current element text into textarea
  chrome.storage.sync.get('currentText', function (items) {
      if (!chrome.runtime.error) {
        setCurrentQuantumText(items.currentText);
     }
  });

  // Close Button
  $(".quantum-text-editor-close-btn").click(function () {
    chrome.extension.sendMessage({action: 'hideQuantumTextEditorPopup'})
  });

  // Submit Button
  $(".quantum-text-editor-submit-btn").click(function () {
    chrome.extension.sendMessage({action: 'submitQuantumTextEditorPopup', text: getCurrentQuantumText()});
  });

});


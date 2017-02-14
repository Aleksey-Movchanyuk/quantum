
function getCurrentQuantumText() {
  return $('.quantum-text-area').val();
}

function setCurrentQuantumText(text) {
  alert(text);
  $('.quantum-text-area').val(text);
}

$(document).ready(function() {

  // Popup Close button
  $(".quantum-text-editor-close-btn").click(function () {
    chrome.extension.sendMessage({action: 'hideQuantumTextEditorPopup'})
  });

  // Popup Submit button
  $(".quantum-text-editor-submit-btn").click(function () {
      chrome.extension.sendMessage({action: 'submitQuantumTextEditorPopup', text: getCurrentQuantumText()});
  });

});

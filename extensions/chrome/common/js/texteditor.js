
function getCurrentQuantumText() {
  return $('.quantum-text-area').val();
}

function setCurrentQuantumText(text) {
  //alert(text);
  $('.quantum-text-area').val(text);
}

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

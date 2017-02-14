


$(document).ready(function() {
  $(".quantum-text-editor-close-btn").click(function () {
    //alert("Hello!");
    chrome.extension.sendMessage({action: 'hideQuantumTextEditorPopup'})
    //$('.quantum-text-editor-popup').css('display','none');
  });
});

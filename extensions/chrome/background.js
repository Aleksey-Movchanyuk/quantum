


// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));

  chrome.tabs.create({
      url: chrome.extension.getURL('packages/textedotor/texteditor.html'),
      active: false
    }, function(tab) {
      // After the tab has been created, open a window to inject the tab
      chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          focused: true
      });
  });


}


//////////////////////////////////////////////////////////
// CREATE CONTEXT MENU
////////////////////////////////////////////////////////
var menuItems = [
  {
  	"id": "quantumTextEditor",
  	"title": "Quantum Text Editor",
    "type": "normal",
  	"contexts": ["page"]
  },
  {
    "id": "quantumTextAnalyzer",
  	"title": "Quantum Text Analyzer",
    "type": "normal",
  	"contexts": ["page"]
  },
  {
    "id": "quantumMenuSeparator1",
  	"title": "",
    "type": "separator",
  	"contexts": ["page"]
  },
  {
    "id": "quantumFeatureX",
  	"title": "Quantum Feature X",
    "type": "normal",
  	"contexts": ["page"]
  },
  {
    "id": "quantumFeatureY",
  	"title": "Quantum Feature Y",
    "type": "normal",
  	"contexts": ["page"]
  },
  {
    "id": "quantumTextEditorFromEditable",
  	"title": "Edit this text with Quantum",
    "type": "normal",
  	"contexts": ["editable"]
  }
];

for (var i = 0; i < menuItems.length; i++) {
  var menuItem = menuItems[i];
  var id = chrome.contextMenus.create(menuItem);
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {

  switch(info.menuItemId) {
      case "quantumTextEditor":
          genericOnClick(info, tab);
          break;
      case "quantumTextAnalyzer":
          alert("quantumTextAnalyzer");
          break;
      case "quantumFeatureX":
          alert("quantumFeatureX");
          break;
      case "quantumFeatureY":
          alert("quantumFeatureY");
          break;
      case "quantumTextEditorFromEditable":
          // send message to content script
          chrome.tabs.sendMessage(tab.id, {action: "popupQuantumTextEditor"});
          break;
  }

});


//Messages from iframe js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	switch(request.action){
		case 'hideQuantumTextEditorPopup':
      chrome.tabs.sendMessage(sender.tab.id, {action: "hideQuantumTextEditorPopup"});
		break;
    case 'submitQuantumTextEditorPopup':
      chrome.tabs.sendMessage(sender.tab.id, {action: "submitQuantumTextEditorPopup", text: request.text});
		break;
	}

	return true;
});

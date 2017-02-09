// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));

  chrome.tabs.create({
      url: chrome.extension.getURL('texteditor.html'),
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

// A generic onclick callback function.
function radioOnClick(info, tab) {
  console.log("radio item " + info.menuItemId +
              " was clicked (previous checked state was "  +
              info.wasChecked + ")");
}

/* ---------------------------------------------------------
   Create common menu
---------------------------------------------------------*/
var textEditorItem = chrome.contextMenus.create(
    {"title": "Quantum Text Editor", "onclick": genericOnClick});

var textAnalyzerItem = chrome.contextMenus.create(
    {"title": "Quantum Text Analyzer", "onclick": genericOnClick});

chrome.contextMenus.create({"type": "separator"});


var xItem = chrome.contextMenus.create(
    {"title": "Quantum Feature X", "onclick": genericOnClick});

var yItem = chrome.contextMenus.create(
    {"title": "Quantum Feature Y", "onclick": genericOnClick});

/* ---------------------------------------------------------
   Create context type menu
---------------------------------------------------------*/
var contexts = ["editable"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Edit this text with Quantum";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}


// Intentionally create an invalid item, to show off error checking in the
// create callback.
console.log("About to try creating an invalid item - an error about " +
            "item 999 should show up");
chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
  if (chrome.extension.lastError) {
    console.log("Got expected error: " + chrome.extension.lastError.message);
  }
});

//////////////////////////////////////////////////////////
// ACTIONS

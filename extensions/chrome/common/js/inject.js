var iframe  = document.createElement ("iframe");
iframe.style.cssText = "visibility: hidden;top: -9999px;position: absolute;opacity: 0",
iframe.src  = chrome.extension.getURL ("texteditor.html");

document.body.appendChild( iframe );

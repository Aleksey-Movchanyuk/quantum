

var iframe  = document.createElement ("iframe");
//iframe.style.cssText = "visibility: hidden;top: -9999px;position: absolute;opacity: 0";
iframe.style.cssText = "width: 640px; height: 510px; box-shadow: 5px 5px #818181; position:absolute; top:0; bottom:0; right:0; left:0; margin:auto;  border-radius: 4px;";
iframe.src  = chrome.extension.getURL ("popup.html");

document.body.appendChild( iframe );

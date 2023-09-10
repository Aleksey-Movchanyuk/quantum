// Definition of quantum namespaces

var QuantumTextEditor = {

    activeElement : null,
    activeElementText : null,

    quantumTextEditorId : 'quantum-text-editor-popup',
    quantumTextEditorClass : 'quantum-text-editor-popup',



	actionHandler: function(data, sender, sendResponse) {
		if (typeof sender != 'undefined')
			if (!sender.tab)
				switch(data.action){

          		case 'popupQuantumTextEditor':

		          	// If not injected yet
					if ($('#'+this.quantumTextEditorId).length==0){

						var url = chrome.extension.getURL('common/packages/texteditor/texteditor.html');
						var quantumTextEditorHtml = 
							'<div id="' + this.quantumTextEditorId + 
								'" class="' + this.quantumTextEditorClass + '" style="display:none;opacity:1;">' + 
								'<iframe id="quantum-text-editor" class="quantum-text-editor" src="' + url + '" frameBorder="0"></iframe>' + 
								'</div>';
						//iframe = iframe.replace('Some text in the modal.', activeElementText);

						$('body:eq(0)').append(quantumTextEditorHtml);

						// append font
						var fa = document.createElement('style');
						fa.type = 'text/css';
						fa.textContent = '@font-face { font-family: Lato-Light; src: url("'
							+ chrome.extension.getURL('common/fonts/LatoOFL/Lato-Lig.ttf')
							+ '"); }';
						$('body:eq(0)').append(fa);

					}

                    activeElement = document.activeElement;
                    activeElementText = activeElement.value;

					// Save it using the Chrome extension storage API.
					chrome.storage.sync.set({"currentText": activeElementText});

                    $('.quantum-text-editor-popup').css('display','block');
    				break;

    			case 'hideQuantumTextEditorPopup':

    				$('.quantum-text-editor-popup').css('display','none');
    				break;

				case 'submitQuantumTextEditorPopup':

                    $('.quantum-text-editor-popup').css('display','none');
	    			activeElement.value = data.text;
	    			break;

		}
		return true;
	}

};
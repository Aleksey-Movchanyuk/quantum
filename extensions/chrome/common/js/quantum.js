// Definition of quantum namespaces

var QuantumTextEditorEngine = {

    activeElement : null,
    activeElementText : null,

    quantumTextEditorId : 'quantum-text-editor-popup',
    quantumTextEditorClass : 'quantum-text-editor-popup',

	inject: function() {
        // If not injected yet
		if ($('#'+this.quantumTextEditorId).length==0){

            var url = chrome.extension.getURL('common/packages/texteditor/texteditor.html');
            var iframe = '<iframe id="'+this.quantumTextEditorId+'" src="' + url + '" class="'+this.quantumTextEditorClass+'" style="display:none;opacity:1;" frameBorder="0"></iframe>';

			$('body:eq(0)').append(iframe);

		}
	},


	actionHandler: function(data, sender, sendResponse) {
		if (typeof sender != 'undefined')
			if (!sender.tab)
				switch(data.action){

          case 'popupQuantumTextEditor':

                    activeElement = document.activeElement;
                    activeElementText = activeElement.value;

                    $('.quantum-text-editor-popup').css('display','block');
                    //$('.quantum-text-area').val(activeElementText);
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
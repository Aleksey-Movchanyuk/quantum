var QuantumTextEditorProcessor = {

    /**
    * mapping for special characters so they can support
    *
    * this dictionary is only used incase you want to bind a
    * keyup or keydown event to one of these keys
    *
    * @type {Object}
    */
    _BREAK_WORD_KEY_MAP : {
                13: ' ', //enter
                27: ' ', //escape
                32: ' ', //space
                38: ' ', //up arrow
                39: ' ', //right arrow
                40: ' ', //down arrow
                //33: '!',
                //34: '"',
                //35: '#',
                //36: '$',
                //37: '%',
                //38: '&',
                //39: '\'',
                //40: '(',
                41: ')',
                42: '*',
                43: '+',
                44: ',',
                189: '-',
                190: '.',
                111: '/',
                //58: ':',
                186: ';',
                60: '<',
                61: '=',
                62: '>',
                63: '?',
                64: '@',
                219: '[',
                220: '\\',
                221: ']',
                94: '^',
                95: '_',
                192: '`',
                123: '{',
                124: '|',
                125: '}',
                126: '~'
    },

   _HELPER_ACCEPT_KEY_MAP : {
                13: ' ', //enter
                32: ' ', //space
                39: ' '  //right arrow
   },

   _HELPER_CTRL_KEY_MAP : {
                38: ' ',  //up arrow
                40: ' '   //down arrow
   },


    // text box elements
    textBox : $('#quantum-text-area'),
    textBoxHelper : $('#quantum-text-help-list'),
    textBoxHelperItem : -1,

    // useful functions
    getCursorPos : function() {
        var input = this.textBox;

        if ("selectionStart" in input && document.activeElement == input) {
            return {
                start: input.selectionStart,
                end: input.selectionEnd
            };
        }
        else if (input.createTextRange) {
            var sel = document.selection.createRange();
            if (sel.parentElement() === input) {
                var rng = input.createTextRange();
                rng.moveToBookmark(sel.getBookmark());
                for (var len = 0;
                        rng.compareEndPoints("EndToStart", rng) > 0;
                        rng.moveEnd("character", -1)) {
                    len++;
                }
                rng.setEndPoint("StartToStart", input.createTextRange());
                for (var pos = { start: 0, end: len };
                        rng.compareEndPoints("EndToStart", rng) > 0;
                        rng.moveEnd("character", -1)) {
                    pos.start++;
                    pos.end++;
                }
                return pos;
            }
        }
        return -1;
    },

    getCurrentSentence : function() {

        return this.textBox.val();
    },

    // Hide helper
    hideHelper : function() {
        // reset selected item from helper
        this.textBoxHelperItem = -1;
        this.textBoxHelper.hide();
        this.textBox.focus();
    },

    // On select helper
    selectHelper : function(e) {
        this.hideHelper();
    },

    // Display helper
    displayHelper : function(e) {

        if (this._BREAK_WORD_KEY_MAP[e.which]) {
            this.hideHelper();
        }
        else {
            // Find cursor position

            // Predict word
            var predictionResult = QuantumTextEditorPredictor.predictWord(this.getCurrentSentence());

            // Predict sentence

            // Clear help list
            this.textBoxHelper.empty();

            var currentSentance = this.getCurrentSentence() + String.fromCharCode(e.which);
            //console.log(e.which);

            // Fill help list with new values
            for(var i = 0; i < predictionResult.length; i++) {

                $('<p>', {
                    'class': 'quantum-text-help-list-elem',
                    'id' : 'quantum-text-help-list-elem-' + i,
                    text: predictionResult[i],
                    click: function(e){
                        e.preventDefault();
                        //alert("test")
                        QuantumTextEditorProcessor.selectHelper(e);
                    }}).appendTo("#quantum-text-help-list");

            }

            this.textBoxHelper.show();
        }
    },

    // Button down arrow handler
    chooseHelperItemNext : function() {

        // if next item exists
        if( $('#quantum-text-help-list-elem-'+String(this.textBoxHelperItem+1)).length )         // use this if you are using id to check
        {
            // remove selection from old item
            $('#quantum-text-help-list-elem-'+String(this.textBoxHelperItem)).removeClass('quantum-text-help-list-elem-current');

            // add selection to the new item
            this.textBoxHelperItem++;
            $('#quantum-text-help-list-elem-'+String(this.textBoxHelperItem)).addClass('quantum-text-help-list-elem-current');
        }
    },

    // Button up arrow handler
    chooseHelperItemPrev : function() {

        // if next item exists
        if( $('#quantum-text-help-list-elem-'+String(this.textBoxHelperItem-1)).length )         // use this if you are using id to check
        {
            // remove selection from old item
            $('#quantum-text-help-list-elem-'+String(this.textBoxHelperItem)).removeClass('quantum-text-help-list-elem-current');

            // add selection to the new item
            this.textBoxHelperItem--;
            $('#quantum-text-help-list-elem-'+String(this.textBoxHelperItem)).addClass('quantum-text-help-list-elem-current');
        }
    }

};


// Keydown handler
$(QuantumTextEditorProcessor.textBox).on("keydown", function (e) {

    // if helper is showen
    if ( QuantumTextEditorProcessor.textBoxHelper.css('display') == 'block' ) {

        if(e.which == 40) { // down key
            QuantumTextEditorProcessor.textBoxHelper.focus();
            QuantumTextEditorProcessor.chooseHelperItemNext();
            e.preventDefault();
        }
        else if(e.which == 38) { // up key
            QuantumTextEditorProcessor.textBoxHelper.focus();
            QuantumTextEditorProcessor.chooseHelperItemPrev();
            e.preventDefault();
        }
        else if(QuantumTextEditorProcessor._HELPER_ACCEPT_KEY_MAP[e.which] && QuantumTextEditorProcessor.textBoxHelperItem > -1) { // accept key
            QuantumTextEditorProcessor.selectHelper();
            e.preventDefault();
        }
        //console.log(e.which);
    }
});


// Keyup handler
$(QuantumTextEditorProcessor.textBox).on("keyup", function (e) {

    // if helper is showen
    if ( QuantumTextEditorProcessor.textBoxHelper.css('display') == 'block' ) {

        if(QuantumTextEditorProcessor._HELPER_CTRL_KEY_MAP[e.which]) { // helper control key
            e.preventDefault();
            return;
        }
        else if(QuantumTextEditorProcessor._HELPER_ACCEPT_KEY_MAP[e.which] && QuantumTextEditorProcessor.textBoxHelperItem > -1) { // accept key
            e.preventDefault();
            return;
        }

    }

    QuantumTextEditorProcessor.displayHelper(e);        

});

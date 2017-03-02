var QuantumTextEditorProcessor = {

    /**
    * mapping for special characters so they can support
    *
    * this dictionary is only used incase you want to bind a
    * keyup or keydown event to one of these keys
    *
    * @type {Object}
    */
    _BREAK_KEY_MAP : {
                27: '', //escape
                32: ' ',
                33: '!',
                34: '"',
                35: '#',
                36: '$',
                37: '%',
                38: '&',
                39: '\'',
                40: '(',
                41: ')',
                42: '*',
                43: '+',
                44: ',',
                45: '-',
                46: '.',
                47: '/',
                58: ':',
                59: ';',
                60: '<',
                61: '=',
                62: '>',
                63: '?',
                64: '@',
                91: '[',
                92: '\\',
                93: ']',
                94: '^',
                95: '_',
                96: '`',
                123: '{',
                124: '|',
                125: '}',
                126: '~'
    },

    selectHint : function(e) {

        console.log(e);
        $('#quantum-text-help-list').hide();
        $('#quantum-text-area').focus();
    },

    getCursorPosition : function() {
        var ctrl = $('#quantum-text-area');
        var CaretPos = 0; // IE Support
            if (document.selection) {
                ctrl.focus();
                var Sel = document.selection.createRange();
                Sel.moveStart('character', -ctrl.value.length);
                CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || ctrl.selectionStart == '0')
                CaretPos = ctrl.selectionStart;
            return (CaretPos);
    },

    getCurrentSentence : function() {

        return $('#quantum-text-area').val();
    },

    displayHint : function(e) {

        if (this._BREAK_KEY_MAP[e.which]) {
            $('#quantum-text-help-list').hide();
        }
        else {

            // Clear help list
            $("#quantum-text-help-list").empty();

            var currentSentance = this.getCurrentSentence() + String.fromCharCode(e.which);
            console.log(e.which);

            // Fill help list with new values
            for(var i = 0; i < 5; i++) {

                $('<p>', {
                    'class': 'quantum-text-help-list-elem',
                    text: currentSentance + " " + i,
                    click: function(e){
                        e.preventDefault();
                        //alert("test")
                        QuantumTextEditorProcessor.selectHint(e);
                    }}).appendTo("#quantum-text-help-list");

            }

            $('#quantum-text-help-list').show();
        }
    },

}

// keypress
$(document).on("keypress", function (e) {
    // use e.which
    //alert(e.which);
    QuantumTextEditorProcessor.displayHint(e);
});

// escape keypress
$(document).on("keyup", function (e) {
    // use e.which
    if(e.which == 27) {
        $('#quantum-text-help-list').hide();
    }
});
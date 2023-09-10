var QuantumTextEditorPredictor = {


    predictWord : function(sentence) {

        var result = [
            sentence + ' 0',
            sentence + ' 1',
            sentence + ' 2',
            sentence + ' 3',
            sentence + ' 4'
        ];

        return result;
    },

    predictSentence : function(sentence) {

        var result = [
            sentence + ' 0',
            sentence + ' 1',
            sentence + ' 2',
            sentence + ' 3',
            sentence + ' 4'
        ];
		
		// rest api request 
		var httpRequest = "http://quantum.ai/api/textpredictor/?" + encodeURI(sentence);
		

        return result;
    }
}

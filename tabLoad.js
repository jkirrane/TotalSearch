function formatString(text) { // Used for Wikipedia
	var theText = text.replace(' ','_');
	return theText;
}

function onPageDetailsReceived(pageDetails)  { 
    var selectedText = pageDetails.selected;
    if(selectedText == '') {
	    $('body').html('Please highlight text and try again.');
    } else {
	    var wikiText = formatString(selectedText);
	    var imageText = encodeURI(selectedText);
		var imageUrl = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+imageText+'&rsz=8';
	    getWikiResults(wikiText);
	    getImageResults(imageUrl);
	}
}

function getWikiResults(text) {
	var lookupUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search='+text;

	$.getJSON(lookupUrl, function(data) {
		var len = data[1].length;
		for(i = 0; i < len; i++) {
	    	$('#wiki .results').append('<p><a target="_blank" href="'+data[3][i]+'">'+data[1][i]+'</a> - '+data[2][i]+'</p>');
		}
		if(len == 0) {
			$('#wiki .results').append('<p>No results on Wikipedia</p>');
		}
		
	});
}

function getImageResults(lookupUrl) {
	
	$.getJSON(lookupUrl, function(data) {
		var results = data.responseData.results;
		var len = results.length;
		console.log(len);
		for(i=0; i < len; i++) {
			$('#images .results').append('<a href="'+results[i].url+'" target="_blank"><img src="'+results[i].tbUrl+'" /></a>');
		}
	});
}

$(window).load(function() {
    chrome.runtime.getBackgroundPage(function(eventPage) {
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});
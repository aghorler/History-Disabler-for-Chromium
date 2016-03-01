/*	Function to clear all browsing history using the BrowsingData API. */
function clearBrowsingData() {
	chrome.browsingData.removeHistory({
		"originTypes": {
			"protectedWeb": true,
			"unprotectedWeb": true,
			"extension": true
		}
	});
}

/*	Clear all browsing history on install. */
chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		clearBrowsingData();
	}
});

/*	Remove a history item immediately after being generated. */
chrome.history.onVisited.addListener(function(historyItem) {
	chrome.history.deleteUrl({
		"url": historyItem.url
	});
});

/*	Clear history on tab close. 
	This clears browsing history listed in 'Recently closed'. */
chrome.tabs.onRemoved.addListener(function() {
	clearBrowsingData();
});

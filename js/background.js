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

/*	Function to clear a specific item from history using the History API. */
function clearHistory(historyItem){
	chrome.history.deleteUrl({
		"url": historyItem
	});
}

/*	Call clearBrowsingData() on install. */
chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install") {
		clearBrowsingData();
	}
});

/*	Call clearHistory when an website is added to history. */
chrome.history.onVisited.addListener(function(historyItem) {
	clearHistory(historyItem.url);
});

/*	Call clearBrowsingData() on tab close. 
	This clears any browsing history listed in 'Recently closed'. */
chrome.tabs.onRemoved.addListener(function() {
	clearBrowsingData();
});

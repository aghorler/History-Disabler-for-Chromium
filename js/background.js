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

/*	Call clearBrowsingData() on install. */
chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install") {
		clearBrowsingData();
	}
});

/*	Call clearBrowsingData() after a history item is generated. */
chrome.history.onVisited.addListener(function(historyItem) {
	/*chrome.history.deleteUrl({
		"url": historyItem.url
	});*/
	clearBrowsingData();
});

/*	Call clearBrowsingData() on tab close. 
	This clears any browsing history listed in 'Recently closed'. */
chrome.tabs.onRemoved.addListener(function() {
	clearBrowsingData();
});

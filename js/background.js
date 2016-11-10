/*	Function to clear all browsing history using the BrowsingData API. */
function clearBrowsingData(){
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

/*	Function to erase an item from download history using the Downloads API. */
function eraseDownload(downloadItem){
	if(typeof downloadItem.state !== 'undefined'){
		if(downloadItem.state.current === 'complete' || downloadItem.state.current === 'interrupted'){
			chrome.downloads.erase({
				limit: 1,
				id: downloadItem.id
			});
		}
	}
}

/*	Call clearBrowsingData on install. */
chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		clearBrowsingData();
	}
});

/*	Call clearHistory when an website is added to history. */
chrome.history.onVisited.addListener(function(historyItem){
	clearHistory(historyItem.url);
});

/*	Call clearBrowsingData on tab close. 
	This clears any browsing history listed in 'Recently closed'. */
chrome.tabs.onRemoved.addListener(function(){
	clearBrowsingData();
});

/*	Call eraseDownload on download completion, if option is enabled. */
chrome.downloads.onChanged.addListener(function(downloadItem){
	chrome.storage.local.get('downloadOption', function(option){
		if(option.downloadOption){
			eraseDownload(downloadItem);
		}
	});
});

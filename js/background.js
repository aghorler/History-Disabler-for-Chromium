chrome.history.onVisited.addListener(function(historyItem) {
	chrome.history.deleteUrl({
		"url": historyItem.url
	});
});
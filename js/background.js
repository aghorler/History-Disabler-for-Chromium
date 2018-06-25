/* Function to clear all browsing history using the BrowsingData API. */
function clearBrowsingData(){
  chrome.browsingData.removeHistory({
    "originTypes": {
      "protectedWeb": true,
      "unprotectedWeb": true,
      "extension": true
    }
  });
}

/* Function to clear a specific URL from history using the History API. */
function clearHistory(historyUrl){
  chrome.history.deleteUrl({
    "url": historyUrl
  });
}

/* Function to erase an item from download history using the Downloads API. */
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

var tabs = [];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.url !== undefined){
    if(tabs[tabId] !== undefined){
      tabs[tabId].push(changeInfo.url);
      //console.log("added " + changeInfo.url + " to index " + tabId);
    }
    else{
      tabs[tabId] = [];
      tabs[tabId].push(changeInfo.url);
      //console.log("created and added " + changeInfo.url + " to index " + tabId);
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if(tabs[tabId] !== undefined){
    var i;
    for(i = 0; i < tabs[tabId].length; i++){
      //console.log("Clearing " + tabs[tabId][i]);
      clearHistory(tabs[tabId][i]);
    }

    tabs[tabId] = [];
  }
});

/* Call eraseDownload on download completion, if clear option is enabled. */
chrome.downloads.onChanged.addListener(function(downloadItem){
  chrome.storage.local.get('clearDownloads', function(option){
    if(option.clearDownloads){
      eraseDownload(downloadItem);
    }
  });
});

/* Call clearBrowsingData on browser start, and extension install. */
clearBrowsingData();

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

/* Initiate array to store tab history. */
var tabs = [];

/* Store tab history if extension is in modern mode. */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  chrome.storage.local.get('disableMethodLegacy', function(option){
    if(!option.disableMethodLegacy){
      if(changeInfo.url !== undefined){
        if(tabs[tabId] !== undefined){
          tabs[tabId].push(changeInfo.url);
        }
        else{
          tabs[tabId] = [];
          tabs[tabId].push(changeInfo.url);
        }
      }
    }
  });
});

/* Delete history, or delete recently closed tab history, depending on extension mode and options. */
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  chrome.storage.local.get('disableMethodLegacy', function(option){
    if(!option.disableMethodLegacy){
      if(tabs[tabId] !== undefined){
        var i;
        for(i = 0; i < tabs[tabId].length; i++){
          clearHistory(tabs[tabId][i]);
        }

        tabs[tabId] = [];
      }
    }
    else{
      chrome.storage.local.get('retainTabs', function(option){
        if(!option.retainTabs){
          clearBrowsingData();
        }
      });
    }
  });
});

/* Delete history immediately if extension is in legacy mode. */
chrome.history.onVisited.addListener(function(historyItem){
  chrome.storage.local.get('disableMethodLegacy', function(option){
    if(option.disableMethodLegacy){
      clearHistory(historyItem.url);
    }
  });
});

/* Call eraseDownload on download completion, if clear option is enabled. */
chrome.storage.local.get('clearDownloads', function(option){
  chrome.downloads.onChanged.addListener(function(downloadItem){
    if(option.clearDownloads){
      eraseDownload(downloadItem);
    }
  });
});

/* Open options page on install and update. */
chrome.runtime.onInstalled.addListener(function(details){
  chrome.runtime.openOptionsPage();
});

/* Call clearBrowsingData on browser start, and extension install. */
clearBrowsingData();

function saveOptions(){
  var downloadOption = document.getElementById('download_option').checked;
  var tabsOption = document.getElementById('tabs_option').checked;
  chrome.storage.local.set({
    clearDownloads: downloadOption,
    retainTabs: tabsOption
  });
}

function restoreOptions(){
  chrome.storage.local.get({
    clearDownloads: false,
    retainTabs: false
  }, function(items){
    document.getElementById('download_option').checked = items.clearDownloads;
    document.getElementById('tabs_option').checked = items.retainTabs;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('download_option').addEventListener('change', saveOptions);
document.getElementById('tabs_option').addEventListener('change', saveOptions);

function saveOptions(){
  var downloadOption = document.getElementById('download_option').checked;
  chrome.storage.local.set({
    clearDownloads: downloadOption
  });
}

function restoreOptions(){
  chrome.storage.local.get({
    clearDownloads: false,
    retainTabs: false
  }, function(items){
    document.getElementById('download_option').checked = items.clearDownloads;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('download_option').addEventListener('change', saveOptions);

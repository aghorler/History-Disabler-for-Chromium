function saveOptions(){
  var downloadOption = document.getElementById('download-option').checked;
  var methodOptionRadioModern = document.getElementById('method-modern').checked;
  var retainTabsOption = document.getElementById('tabs-option').checked;

  if(methodOptionRadioModern){
    var methodOptionLegacy = false;
    document.getElementById('tabs-option').disabled = true;
    document.getElementById('tabs-option-container').style.color = "grey";
  }
  else{
    var methodOptionLegacy = true;
    document.getElementById('tabs-option').disabled = false;
    document.getElementById('tabs-option-container').style.color = "";
  }

  chrome.storage.local.set({
    disableMethodLegacy: methodOptionLegacy,
    retainTabs: retainTabsOption,
    clearDownloads: downloadOption
  });
}

function restoreOptions(){
  chrome.storage.local.get({
    disableMethodLegacy: false,
    retainTabs: false,
    clearDownloads: false
  }, function(items){
    if(items.disableMethodLegacy){
      document.getElementById('method-modern').checked = false;
      document.getElementById('method-legacy').checked = true;
      document.getElementById('tabs-option').disabled = false;
      document.getElementById('tabs-option-container').style.color = "";
    }
    else{
      document.getElementById('method-modern').checked = true;
      document.getElementById('method-legacy').checked = false;
      document.getElementById('tabs-option').disabled = true;
      document.getElementById('tabs-option-container').style.color = "grey";
    }

    document.getElementById('tabs-option').checked = items.retainTabs;
    document.getElementById('download-option').checked = items.clearDownloads;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('method-modern').addEventListener('change', saveOptions);
document.getElementById('method-legacy').addEventListener('change', saveOptions);
document.getElementById('tabs-option').addEventListener('change', saveOptions);
document.getElementById('download-option').addEventListener('change', saveOptions);

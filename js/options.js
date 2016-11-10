function saveOptions(){
	var option = document.getElementById('download_option').checked;
	chrome.storage.local.set({
		downloadOption: option
	}, function(){
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		status.style.color = "green";
		setTimeout(function(){
			status.textContent = '';
		}, 750);
	});
}

function restoreOptions(){
	chrome.storage.local.get({
		downloadOption: false
	}, function(items){
		document.getElementById('download_option').checked = items.downloadOption;
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

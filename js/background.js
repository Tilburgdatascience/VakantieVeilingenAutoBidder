chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({'bidPrice': 0, 'timeBeforeEnd': 2, 'name': 'Your Name', 'botEnabled': false}, function(){
        //initial save completed
    });
    updateUIEnabled();
});

chrome.runtime.onStartup.addListener(function() {
    updateUIEnabled();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.updateUI) updateUIEnabled();
});

function updateUIEnabled() {
    chrome.storage.sync.get(['botEnabled'], function(data) {
        if(data.botEnabled) {
            chrome.browserAction.setBadgeText({text:'✓'});
        }else{
            chrome.browserAction.setBadgeText({text:'□'});
        }
    });
}

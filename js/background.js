chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ 'bidPrice': 0, 'timeBeforeEnd': 2, 'name': 'Your Name', 'botEnabled': false }, function () {
        // initial save completed
    });
    updateUIEnabled();
});

chrome.runtime.onStartup.addListener(function () {
    updateUIEnabled();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.updateUI) updateUIEnabled();
});

function updateUIEnabled() {
    // Ensure chrome.browserAction is defined
    if (chrome.browserAction) {
        chrome.storage.sync.get(['botEnabled'], function (data) {
            if (data.botEnabled) {
                chrome.browserAction.setBadgeBackgroundColor({ color: [76, 174, 76, 255] }); // Green color
                chrome.browserAction.setBadgeText({ text: '✓' });
            } else {
                chrome.browserAction.setBadgeBackgroundColor({ color: [249, 97, 92, 255] }); // Red color
                chrome.browserAction.setBadgeText({ text: '□' });
            }
        });
    } else {
        console.error("chrome.browserAction is undefined or not available. Check if it's properly initialized.");
    }
}

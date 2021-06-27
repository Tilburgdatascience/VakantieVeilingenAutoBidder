'use strict';

var saveConfig = document.getElementById('saveConfig');
var bidPrice = document.getElementById('bidPrice');
var timeBeforeEnd = document.getElementById('timeBeforeEnd');
var userName = document.getElementById('userName');
var botEnabled = document.getElementById('botEnabled');

var savedText = document.createElement('span');
savedText.setAttribute('id', 'savedText');
savedText.innerText = 'Settings saved!';

chrome.storage.sync.get(['bidPrice', 'timeBeforeEnd', 'name', 'botEnabled'], function(data) {
  bidPrice.value = data.bidPrice;
  timeBeforeEnd.value = data.timeBeforeEnd;
  userName.value = data.name;
  botEnabled.checked = data.botEnabled;
});

saveConfig.onclick = function() {
    var price = bidPrice.value;
    var tbe = timeBeforeEnd.value;
    var name = userName.value;
    var enabled = botEnabled.checked;
    chrome.storage.sync.set({'bidPrice': price, 'timeBeforeEnd': tbe, 'name': name.toLowerCase(), 'botEnabled': enabled}, function(){
        if(!document.getElementById('stuffSaved')) {
            document.getElementById('menuFrame').appendChild(savedText);
            chrome.runtime.sendMessage(null, {'updateUI': true});
        }
    });
    chrome.tabs.query({'active': true, 'url': 'https://*.vakantieveilingen.nl/*'}, function (tabs) {
        if(tabs.length > 0) {
            chrome.tabs.reload(tabs[0].id, null, function() {
                //page reloaded
            });
        }
    });
};

'use strict';

window.onload = bot;

var price;
var tbe;
var name;

var lastMinuteReached = false;

function bot() {
    chrome.storage.sync.get(['bidPrice', 'timeBeforeEnd', 'name', 'botEnabled'], function(data) {
        if(data.botEnabled) {
            price = data.bidPrice;
            tbe = data.timeBeforeEnd;
            name = data.name;
            tryBid();
        }
    });
}

function tryBid() {
    var priceInput = document.getElementById('jsActiveBidInput');
    var bidButton = document.getElementById('jsActiveBidButton');
    priceInput.value = price;

    var intervalId = setInterval(function() {
        var secondsLeft = document.getElementsByClassName('js-seconds')[0];
        var highestBid = document.getElementById('jsMainLotCurrentBid');
        if(secondsLeft.parentElement.getElementsByTagName('svg').length !== 0 || lastMinuteReached) {
            lastMinuteReached = true;
            if(parseInt(secondsLeft.innerText) <= parseInt(tbe)) {
                if(parseInt(highestBid.innerText) < parseInt(price)) {
                    bidButton.click();
                }
            }
        }
        if(document.getElementsByClassName('auction-closing').length > 0) {
            checkForWin();
            clearInterval(intervalId);
        }
    }, 10);
}

function checkForWin() {
    var highestBidder = document.getElementById('highestBidder');
    if(highestBidder.innerText.toLowerCase() === name) {
        chrome.storage.sync.set({botEnabled: false});
        chrome.browserAction.setBadgeBackgroundColor({ color: '#f9615c'});
        chrome.browserAction.setBadgeText({text:'□'});
    }else{
        window.location.reload();
    }
}
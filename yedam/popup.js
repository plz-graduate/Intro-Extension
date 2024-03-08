// 팝업이 로드될 때 필요한 스크립트를 웹 페이지에 주입
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['script.js']
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "calculationResult") {
        document.getElementById('result').textContent = message.data;
    }
});
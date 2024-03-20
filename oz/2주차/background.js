// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "avgResult") {
    // content.js에 메시지 전달
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "avgResult",
        avg2: message.avg2,
      });
    });
  }
});

// background.js
chrome.webNavigation.onCompleted.addListener((details) => {
    const tabId = details.tabId;
    const tabUrl = details.url;
  
    if (tabUrl.includes("flipkart.com") && tabUrl.includes("/p/")) {
      chrome.tabs.sendMessage(tabId, {
        action: "productPageUpdated"
      });
    }
  });
  
  
  
  



  
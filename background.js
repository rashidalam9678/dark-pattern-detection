chrome.webNavigation.onCompleted.addListener((details) => {
  const tabId = details.tabId;
  const tabUrl = details.url;

  if (tabUrl.includes("flipkart.com") && tabUrl.includes("/p/")) {
    // Step 1: Send message to content script to initiate data scraping
    console.log("sending scrapping signal")
    chrome.tabs.sendMessage(tabId, { action: 'startDataScraping' });

    console.log("scrapping signal sent")

    // Step 3: Receive message from content script indicating data scraping completion
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'dataScraped' && sender.tab.id === tabId) {
        // Step 4: Make ML model API call
        console.log("recieved the scrapped data")
        makeMLModelAPICall(message.data)
          .then((mlModelResponse) => {
            // Step 5: Send ML model response to content script
            console.log("sending api data to content script")
            chrome.tabs.sendMessage(tabId, { action: 'mlModelResponse', data: mlModelResponse });

            // Step 6: Send ML model response to popup
            console.log("sending api data to popup")
            chrome.runtime.sendMessage({ action: 'mlModelResponse', data: mlModelResponse });
          })
          .catch((error) => {
            console.error('Error in ML model API call:', error);
          });

          return true
      }
    });
  }

});

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === 'scrapedData') {
//     const paragraphs = message.data;

//     console.log("Making call to ML model in background");

//     // Make a call to your ML model API with the scraped data
//     // Use a Promise to handle the asynchronous behavior
//     makeMLModelCall(paragraphs)
//       .then(mlApiResponse => {
//         console.log("sending data to scripts after receiving from model");

//         // background.js
//         const contentViews = chrome.extension.getViews({ type: 'tab' });
//         if (contentViews.length > 0) {
//           chrome.tabs.sendMessage(sender.tab.id, { action: 'mlModelResponse', data: mlApiResponse });
//         }


//         // chrome.runtime.sendMessage({ action: 'mlModelResponse', data: mlApiResponse })
//       })
//       .catch(error => {
//         console.error("Error in ML model call:", error);
//       });
//   }
// });

function makeMLModelAPICall(data) {
  console.log("Making Model call");

  // Simulate an asynchronous call with a Promise and setTimeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("waiting..... 3 seconds");
      resolve({ total: 10, dangers: 4, warnings: 6, extra:data });
    }, 3000);
  });
}


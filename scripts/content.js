// (async () => {
//     console.log("Hey i am from content script")
//     // const currentProduct=""


//     chrome.runtime.onMessage.addListener((obj, sender, response) => {
//         const { type, value, productId } = obj;

//         if (type === "NEW") {
//             console.log("produc Id",productId)
//         }
//     });
// })()

// function updateAllParagraphs(pid){
//     console.log("product id", pid)
// }


// content.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "productPageUpdated") {
//     // Run your function here
//     console.log("Product page updated!");
//     // Call your function to update the product page
//     sendResponse({action:"scrap", data:"my scrapped data"})
//     updateProductPage();
//     // content.js

    
//   }
//   if((message.action === 'mlModelResponse')){
//       console.log("message from background-->", message.data)
//   }
// });

// function updateProductPage() {
//   // Your function logic to update the product page
//   console.log("Updating product page...");
//   const allP = document.querySelector("p")
//   allP.style.background = "red"
//   // Add your code to update the product page content
//   console.log("sending scrapped data to background")

//     // Your content script logic here
//     console.log("dom is updated")
//     // Simulating sending scraped data
//     chrome.runtime.sendMessage({ action: 'scrapedData', data: "I am Paragraph" });
// }


// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startDataScraping') {
    console.log("Recieved the scrapping request from background.js")
    // Step 2: Perform data scraping
    const scrapedData = scrapeData();

    // Step 3: Send message to background indicating data scraping completion
    console.log("sending scrapped data to background.js")
    chrome.runtime.sendMessage({ action: 'dataScraped', data: scrapedData });
    console.log("sent scrapped data to background.js")

  } else if (message.action === 'mlModelResponse') {
    // Step 7: Handle ML model response in content.js
    console.log('Received ML model response in content.js:', message.data);
    console.log("Updating UI")
    // Update content.js UI or perform other actions
  }
});

function scrapeData() {
  // Replace this with your actual data scraping logic
  return 'Scraped data';
}


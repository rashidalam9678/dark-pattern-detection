

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
  // const filePath = '../readData.csv';

  console.log("Scrapped data here ")



  var paragraphsContent = []
  const paragraphs = document.getElementsByTagName('p')

  for (var i = 0; i < paragraphs.length; i++) {
    // paragraphsContent[i] = paragraphs[i].textContent
    paragraphsContent.push([i, paragraphs[i].textContent])
  }



  var spanContent = []
  const spanTag = document.getElementsByTagName('span')

  for (var i = 0; i < spanTag.length; i++) {
    // spanContent[i] = spanTag[i].textContent
    spanContent.push([i, spanTag[i].textContent])
  }
  return paragraphsContent.concat(spanContent)
  // const keys = paragraphsContent.keys()
  // const value = paragraphsContent.values()
  // const id = keys.join(',');
  // const text = value.join(',');
  // var contentCSV = convertDictionaryToCSV(paragraphsContent)
  // downloadCSV(contentCSV, "data.csv")
  // console.log("pragraph content " + paragraphsContent[0])
  // console.log("span content " + spanContent[0])

  // const csvfile = saveDictionaryToCSV({ ...paragraphsContent, ...spanContent }, "data.csv")
  // console.log(csvfile.text())
  // return csvfile

  // return 'Scraped data';
}


// function convertDictionaryToCSV(dictionary) {
//   var csvData = []

//   for(var i=0; i<dictionary.length; i++){
//     csvData.push([i,dictionary[i]])
//   }

//   return csvContent;
// }

// function downloadCSV(csvContent, fileName) {
//   const blob = new Blob([csvContent], { type: 'text/csv' });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement('a');
//   a.href = url;
//   a.download = fileName;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// }


// function saveDictionaryToCSV(dictionary, filename, header = ['page_id', 'text']) {
//   const csvContent = [header.join(',')]
//     .concat(Object.entries(dictionary)
//       .map(([key, value]) => `${key}, ${value}`)
//       .join('\n')
//     );

//   const blob = new Blob([csvContent], { type: 'text/csv' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = filename;
//   link.click();
//   return blob
// }

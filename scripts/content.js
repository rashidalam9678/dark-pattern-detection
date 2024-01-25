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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "productPageUpdated") {
      // Run your function here
      console.log("Product page updated!");
      // Call your function to update the product page
      updateProductPage();
    }
  });
  
  function updateProductPage() {
    // Your function logic to update the product page
    console.log("Updating product page...");
    const allP= document.querySelector("p")
    allP.style.background="red"
    // Add your code to update the product page content
  }
  
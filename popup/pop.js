// import { getActiveTabURL } from "../utils";

document.addEventListener('DOMContentLoaded', async function () {
  let mlModelResponseData = {}

  // get if this active tab have any already set data
  // const activeTab = await getActiveTabURL();
  // chrome.storage.local.get([activeTab.id], (result) => {
  //   mlModelResponseData = JSON.parse(result.activeTab.id) || {};
  // });

  // Your action here
  let contentPlaceholder = document.getElementById("content-loader")
  let constentStatus = document.getElementById("content-status")
  let stats = document.getElementById("statistics")

  

  // popup.js
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'mlModelResponse') {
      mlModelResponseData = message.data;

      // Save the data to chrome.storage.local
      // chrome.storage.local.set({[activeTab.id]: JSON.stringify(mlModelResponseData) });


      // Update your popup UI with the ML model response
      console.log('ML Model Response in popup.js:', mlModelResponseData);
      setStatistics(mlModelResponseData)

      // For example, update a <div> with the mlResponse
      document.getElementById('mlResponseDiv').textContent = JSON.stringify(mlModelResponseData);
    }
  });

  function setStatistics(data) {
    contentPlaceholder.style.display = "none"
    constentStatus.textContent = "Reports"
    if (data) {
      stats.innerHTML = `<h3><strong>Total Vulnerabilities detected: </strong> ${data.total}</h3>
                      <hr>
                      <div class="alert alert-danger" role="alert">
                        <p><strong>Severe Vulnerabilities: </strong> ${data.dangers}</p>
                      </div>
                      <div class="alert alert-warning" role="alert">
                        <p><strong>Warnings: </strong> ${data.warnings}</p> 
                      </div>`
    } else {
      stats.innerHTML = `<div class="alert alert-success" role="alert">
                                No vulnerabilities found
                            </div>`
    }
  }

});







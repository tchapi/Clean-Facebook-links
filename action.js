/* Clean FB urls v3.0 | copyright tchap 2012 */

/* **************** */
// GLOBAL VARIABLES //
/* **************** */

/* STATE OF PLUGIN */ 
var state = 0;

/* ARRAY CONTAINING FB TABS */
var fbTabs = new Array();


/* ************** */
// BROWSER_ACTION //
/* ************** */

// When the user clicks on the plugin button (browser_action)
function toggle() {
  state = 1 - state;
  chrome.browserAction.setIcon({path:"icon48_" + state + ".png"});
  
  if (state == 1) {
    chrome.browserAction.setTitle({title: "Click to deactivate cleaning all Facebook urls"});
    reinjectAll();
  } else  {
    chrome.browserAction.setTitle({title: "Click to activate cleaning all Facebook urls"});
  }
  chrome.tabs.reload();
};

// Adds the toggle Action
chrome.browserAction.onClicked.addListener(toggle);


/* ******* */
// HELPERS //
/* ******* */

// Is this tab a Facebook tab ?
var isItFacebook = function (tab) {
  if (tab.url)
    return (tab.url.indexOf("facebook.com") != -1)
  else 
    return false;
};

// Injection method
var inject = function(tabId){
  if (state == 1)
    chrome.tabs.executeScript(tabId, { file: "inject.js" });
}

// Re-injection method for all tabs
var reinjectAll = function(){
  var nbTabs = fbTabs.length;
  
  for (i=0;i++;i<nbTabs){
    inject(fbTabs[i]);
  }
}

// FB Tabs Array helpers : add a tab
var addToTabs = function(tabId){
  var i = fbTabs.indexOf(tabId);
  if (i == -1) fbTabs.push(tabId);
  // Injects the stuff in the page
  inject(tabId);
}

// FB Tabs Array helpers : remove a tab
var removeFromTabs = function(tabId){
  var i = fbTabs.indexOf(tabId);
  if(i != -1) fbTabs.splice(i, 1);
}

// 1
/* Query all the tabs, and lists those that are Facebook 
*/
chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs){

  var nbTabs = tabs.length;
  
  for (i=0;i++;i<nbTabs){
    if (isItFacebook(tabs[i])){
      addToTabs(tabs[i]);
    }
  }
  
});

// 2 
/* If a new tab is created, and if it is Facebook, add it in the array
*/
chrome.tabs.onCreated.addListener(function(tab) {

  if (isItFacebook(tab)) {
    addToTabs(tab.id);
  }
  
}); 

// 3
/* If a tab is removed, removes it from the array
*/
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {

  removeFromTabs(tabId);
  
});

// 4
/* A tab is updated, we have to reinject
*/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

  if (isItFacebook(tab)) {
    addToTabs(tabId);
  } else {
    // No longer a Facebook tab
    removeFromTabs(tabId);
  }

});

/* Clean FB urls v3.0 | copyright tchap 2012 */

// Our lapse of time before we fire the cleanLinks function again
var hold = 1000;

/* ****************** */
// CLEANING FUNCTIONS
/* ****************** */

// Cleaning the links
var cleanLinks = function() {

  var links = document.querySelectorAll("a");
  var l = links.length;
  
    var currentLink = null;
  var reg = /(https?\:\/\/www\.facebook\.com\/l\.php\?u\=)([^\&]*)\&.*/gi;
  
  for (var i  = 0; i < l; ++i) {
  
    currentLink = links[i];
  
    if (currentLink.target == "_blank") {
    
      currentLink.removeAttribute("onmousedown");
          currentLink.href = decodeURIComponent(currentLink.href.replace(reg,'$2'));

    }
  }
 
  //console.debug(">> Facebook links cleaned.");
  
};

/* ************** */
// EVENT HANDLING
/* ************** */

// Adds a listener in the page
var timeout = null;
document.addEventListener('DOMSubtreeModified', function(){
   if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(cleanLinks, hold);
}, false);

// Fires once for the show !
cleanLinks();
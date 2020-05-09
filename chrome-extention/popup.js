chrome.runtime.onMessage.addListener(function(request, sender) {
  
  const url = request.source
  
  if (request.action == "getSource") {
    message.innerText = ''
    const url = request.source;
    if ( url.match(/https:\/\/www.google.com\/maps/) ) {
      const locPreData = url.split('/')[4]
      const locData = locPreData.split(',').map(s=>s.replace(/([a-z]|@)/g,''))
      if ( (+locData[0]) === 36.1002288 ) {
        if ( (+locData[1]) === 139.6568088 ) {
          if ( 220 <= (+locData[4]) && (+locData[4]) <= 340 ) {
            if ( 60 <= (+locData[5]) && (+locData[5]) <= 130 ) {
              message.innerText += `ここに到着した時のHTML`
            } else {
              message.innerText += `ここにまだ到着していない時のHTML`
            }
          } else {
            message.innerText += `ここにまだ到着していない時のHTML`
          }
        } else {
          message.innerText += `ここにまだ到着していない時のHTML`
        }
      }
    } else {
      message.innerText = `ここにGoogleMAPへの誘導のHTML`
    }
  }

});
  
function onWindowLoad() {
  
  var message = document.querySelector('#message');
  
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  })  
}
  
window.onload = onWindowLoad;
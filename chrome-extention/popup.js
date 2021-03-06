chrome.runtime.onMessage.addListener(function(request, sender) {
  
  const url = request.source
  
  if (request.action == "getSource") {
    message.innerHTML = ''
    const url = request.source;
    if ( url.match(/https:\/\/www.google.com\/maps/) ) {
      const locPreData = url.split('/')[4]
      const locData = locPreData.split(',').map(s=>s.replace(/([a-z]|@)/g,''))
      if ( (+locData[0]) === 36.1002288 ) {
        if ( (+locData[1]) === 139.6568088 ) {
          if ( 220 <= (+locData[4]) && (+locData[4]) <= 340 ) {
            if ( 60 <= (+locData[5]) && (+locData[5]) <= 130 ) {
              message.innerHTML += `<div>
                                      <h3>たどり着きました！！</p>
                                      <p><b>やったね！</b></p>
                                      <img src="66c19942ab4ba346fdb64ccc04cde373-6-e1534034135968.jpg" >
                                    </div>`
            } else {
              message.innerHTML += `<div>
                                      <h3>あと少し！！</h3>
                                      <p>振り向いたらもしかして...</p>
                                      <img src="66c19942ab4ba346fdb64ccc04cde373-6-e1534034135968.jpg" >
                                    </div>`
            }
          } else {
            message.innerHTML += `<div>
                                      <h3>あと少し！！</h3>
                                      <p>振り向いたらもしかして...</p>
                                      <img src="66c19942ab4ba346fdb64ccc04cde373-6-e1534034135968.jpg" >
                                    </div>`
          }
        }
      } else if ((+locData[0]) !== 36.1002381 && (+locData[1]) !== 139.6577021) {
        message.innerHTML += `<div>
                                <h3>もう少し巡ってみよう！</h3>
                                <p>もっとだ！　もっと探すのだ！！</p>
                                 <img src="66c19942ab4ba346fdb64ccc04cde373-6-e1534034135968.jpg" >
                              </div>`
      } else {
        message.innerHTML += `<div>
                                <h3>この画像の聖地を探してね！！</h3>
                                <p>いろいろ、巡ってみようze！</p>
                                <img src="66c19942ab4ba346fdb64ccc04cde373-6-e1534034135968.jpg" >
                              </div>`

      }

    } else {
      message.innerHTML = `<div>
                              <a 
                                href="https://www.google.com/maps/@36.1002381,139.6577021,3a,75y,182.38h,95.66t/data=!3m6!1e1!3m4!1sdDiAHzs_vUGvwcbK3AVfgg!2e0!7i16384!8i8192?hl=ja" 
                                target="_blank"
                                style="color:white;"
                              >
                                <h3>らき☆すたの聖地　鷲宮神社までGO！！</p>
                              </a>
                              <img src="66c19942ab4ba346fdb64ccc04cde373-6-e1534034135968.jpg" >
                           </div>`
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

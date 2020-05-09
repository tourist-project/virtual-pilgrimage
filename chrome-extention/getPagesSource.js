function getLoc(loc) {
    return loc.href
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getLoc(location)
});
// Send a message containing the selected text back to the event page
chrome.runtime.sendMessage({
    'selected': window.getSelection().toString()
});
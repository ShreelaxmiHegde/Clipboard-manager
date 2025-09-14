console.log("Background service worker running....");

//recive the copied text from content.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "NEW_COPY") {
        chrome.storage.local.get(["clipboard"], (result) => {
            // Get existing history or start fresh
            let history = result.clipboard || [];

            // Ensure it's always an array
            if (!Array.isArray(history)) {
                history = [];
            }
            
            // copied text limitations
            if(history.length >= 10) {
                history.shift(); // remove old copy
            }
            
            // Add new copied text
            history.push(message.text);

            // Save updated history
            chrome.storage.local.set({ clipboard: history }, () => {
                console.log("Updated clipboard:", history);
            });
        });
    }
});

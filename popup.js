let clipboard = document.querySelector(".clipboard");

// copy the text after click
function copyText(clipboardItem, textCopy) {
    clipboardItem.addEventListener("click", () => {
    
        navigator.clipboard.writeText(textCopy)
    
            .then(() => {
                // Temporarily change tooltip to "Copied!"
                clipboardItem.setAttribute("data-original", 
                    clipboardItem.getAttribute("data-tooltip") || 
                    "Click to copy"
                );
    
                clipboardItem.style.color = "gray";
                clipboardItem.style.setProperty("--tooltip-text", "'Copied!'");
                
                // Restore after 1.5 seconds
                setTimeout(() => {
                    clipboardItem.style.setProperty("--tooltip-text", "'Click to copy'");
                    clipboardItem.style.background = "";
                }, 2000);
    
            }). catch(err => {
                console.error("Failed to copy :", err);
            });
        
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // fetch clipboard data
    chrome.storage.local.get(["clipboard"], (result) => {
        let history = result.clipboard || [];

        if(history.length == 0) {
            let defaultMsg = document.createElement("p");
            defaultMsg.innerHTML = `<h3>You haven't <b>Copied</b> anything yet!</h3>`;
            defaultMsg.style.color = "white";
            clipboard.appendChild(defaultMsg);
        }

        // show each copied item
        history.forEach(textCopy => {
            let clipboardItem = document.createElement("div");
            let p = document.createElement("p");
            p.innerText = textCopy;

            //copy text after clicking
            copyText(clipboardItem, textCopy);

            clipboardItem.appendChild(p);
            clipboard.prepend(clipboardItem); // add copied text to clipboard
            clipboardItem.classList.add("clipboard-item"); // apply style
            p.classList.add("para");
        });
    });
});
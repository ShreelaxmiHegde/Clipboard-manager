console.log("Content script loaded!");

document.addEventListener("copy", () => {
  let copiedText = window.getSelection().toString();
  
  console.log(copiedText);
  
  //send -> service-worker to store copied texts
  if(copiedText.trim() !== "") {
    chrome.runtime.sendMessage({ type: "NEW_COPY", text: copiedText });
  }
});
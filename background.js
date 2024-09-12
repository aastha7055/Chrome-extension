let popupWindowId = null; 

chrome.runtime.onStartup.addListener(() => {
  setBreakReminder(45); // Starts the timer when Chrome starts
});

chrome.runtime.onInstalled.addListener(() => {
  setBreakReminder(45); // Starts the timer when the extension is installed
});

function setBreakReminder(minutes) {
  chrome.alarms.create('breakReminder', {
    delayInMinutes: minutes,
    periodInMinutes: minutes // Recurring alarm
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'breakReminder') {
    if (popupWindowId !== null) {
      chrome.windows.get(popupWindowId, (window) => {
        if (chrome.runtime.lastError || !window) {
          createPopupWindow();
        }
      });
    } else {
      createPopupWindow();
    }
  }
});

function createPopupWindow() {
  chrome.windows.getCurrent({ populate: true }, (currentWindow) => {
    const windowWidth = currentWindow.width;
    const popupWidth = 300;
    const popupHeight = 300;
    const popupLeft = windowWidth - popupWidth;
    const popupTop = 0;

    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: popupWidth,
      height: popupHeight,
      left: popupLeft,
      top: popupTop
    }, (newWindow) => {
      popupWindowId = newWindow.id; 
    });
  });
}

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === popupWindowId) {
    popupWindowId = null; 
  }
});

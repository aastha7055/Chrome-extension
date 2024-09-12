chrome.runtime.onStartup.addListener(() => {
  setBreakReminder(45); // Starts the timer when Chrome starts
});

chrome.runtime.onInstalled.addListener(() => {
  setBreakReminder(45); // Starts the timer when the extension is installed
});

function setBreakReminder(minutes) {
  chrome.alarms.create('breakReminder', {
    delayInMinutes: minutes,
    periodInMinutes: minutes
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'breakReminder') {
    chrome.action.openPopup(); // Open popup when alarm is triggered
  }
});

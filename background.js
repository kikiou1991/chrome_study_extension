// Create an alarm for the work timer
chrome.alarms.create("workTimer", {
    periodInMinutes: 1 / 60,
});

// Listen for the work timer alarm and decrement the timer if it's running
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "workTimer") {
        chrome.storage.local.get(["workTimer", "isWorkRunning"], (res) => {
            if (res.isWorkRunning) {
                let workTimer = res.workTimer + 1;
                chrome.storage.local.set({
                    workTimer,
                });
            }
        });
    }
});

// Initialize the work timer and isWorkRunning in storage if not found
chrome.storage.local.get(["workTimer", "isWorkRunning"], (res) => {
    chrome.storage.local.set({
        workTimer: "workTimer" in res ? res.workTimer : 0,
        isWorkRunning: "isWorkRunning" in res ? res.isWorkRunning : false,
    });
});

// Create an alarm for the break timer
chrome.alarms.create("breakTimer", {
    periodInMinutes: 1 / 60,
});

// Listen for the break timer alarm and decrement the timer if it's running
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "breakTimer") {
        chrome.storage.local.get(["breakTimer", "isBreakRunning"], (res) => {
            if (res.isBreakRunning) {
                let breakTimer = res.breakTimer + 1;
                chrome.storage.local.set({
                    breakTimer,
                });
            }
        });
    }
});

// Initialize the break timer and isBreakRunning in storage if not found
chrome.storage.local.get(["breakTimer", "isBreakRunning"], (res) => {
    chrome.storage.local.set({
        breakTimer: "breakTimer" in res ? res.breakTimer : 0,
        isBreakRunning: "isBreakRunning" in res ? res.isBreakRunning : false,
    });
});

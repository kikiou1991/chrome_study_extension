// Create an alarm for the work timer
chrome.alarms.create("workTimer", {
    periodInMinutes: 1 / 60,
});

// Listen for the work timer alarm and increment the timer if it's running
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "workTimer") {
        chrome.storage.local.get(["workTimer", "isWorkRunning", "timeOption"], (res) => {
            if (res.isWorkRunning) {
                let workTimer = res.workTimer + 1;
                if (workTimer === 60 * res.timeOption) {
                    this.registration.showNotification("Hustle Timer Is Up", {
                        body: "It is time for a break!",
                        icon: "badger.png",
                    })
                }
                chrome.storage.local.set({
                    workTimer,
                });
            }
        });
    }
});

// Initialize the work timer and isWorkRunning in storage if not found
chrome.storage.local.get(["workTimer", "isWorkRunning", "timeOption"], (res) => {
    chrome.storage.local.set({
        workTimer: "workTimer" in res ? res.workTimer : 0,
        timeOption: "timeOption" in res ? res.timeOption : 50,
        isWorkRunning: "isWorkRunning" in res ? res.isWorkRunning : false,
    });
});

// Create an alarm for the break timer
chrome.alarms.create("breakTimer", {
    periodInMinutes: 1 / 60,
});

// Listen for the break timer alarm and increment the break timer if it's running
chrome.alarms.onAlarm.addListener((breakAlarm) => {
    if (breakAlarm.name === "breakTimer") {
        chrome.storage.local.get(["breakTimer", "isBreakRunning", "breakOption"], (res) => {
            if (res.isBreakRunning) {
                let breakTimer = res.breakTimer + 1;
                if (breakTimer === 60 * res.breakOption) {
                    this.registration.showNotification("Break Timer Is Up", {
                        body: "Break time is over! Back to Work",
                        icon: "badger.png"
                    })
                }
                chrome.storage.local.set({
                    breakTimer,
                });
            }
        });
    }
});

// Initialize the break timer and isBreakRunning in storage if not found
chrome.storage.local.get(["breakTimer", "isBreakRunning", "breakOption"], (res) => {
    chrome.storage.local.set({
        breakTimer: "breakTimer" in res ? res.breakTimer : 0,
        breakOption: "breakOption" in res ? res.breakOption : 20,
        isBreakRunning: "isBreakRunning" in res ? res.isBreakRunning : false,
    });
});

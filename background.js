//Create an alarm for the work timer
chrome.alarms.create("workTimer", {
    periodInMinutes: 1 / 60,
});

//Listen for the work timer alarm and increment the timer if its running
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "workTimer") {
        chrome.storage.local.get(["wrokTimer", "isWorkRunning"], res => {
            if (res.isWorkRunning) {
                let workTimer = res.workTimer + 1;
            }
            chrome.storage.local.set({
                workTimer
            })
        })
    }
})

//Initialize the work timer and isWorkRunning in storage uf not found

chrome.storage.local.get(["workTimer", "isWorkRunning"], res => {
    chrome.storage.local.set({
        workTimer: "workTimer" in res ? res.workTimer : 0,
        isWorkRunning: "isWorkRunning" in res ? res.isWorkRunning : false
    })
})

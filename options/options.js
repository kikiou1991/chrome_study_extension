const timeOption = document.getElementById("time-option");
const breakOption = document.getElementById("break-option");

// Validate input or set it to default for study time
timeOption.addEventListener("change", (event) => {
    const val = event.target.value;
    if (val < 1 || val > 60) {
        timeOption.value = 50;

    }
});

//validate input for rest time and set default if invalid
breakOption.addEventListener("change", e => {
    const val = e.target.value;
    if (val < 1 || val > 60) {
        breakOption.value = 15;
    }

})

//Work Timer / Break Timer  Options
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
    // Save the entered value to chrome.storage.local
    chrome.storage.local.set({
        timeOption: parseInt(timeOption.value),
        breakOption: parseInt(breakOption.value),
        isWorkRunning: false,
        isBreakRunning: false,
        breakTimer: 0,
        workTimer: 0// Convert the value to an integer
    }, function () {
        // Callback function to handle any errors
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log("Value saved successfully");
        }
    });
});

// Retrieve the saved value from chrome.storage.local and set the input field
chrome.storage.local.get(["timeOption", "breakOption"], (res) => {
    if (res.timeOption !== undefined && res.breakOption !== undefined) {
        timeOption.value = res.timeOption;
        breakOption.value = res.breakOption;
    }
});
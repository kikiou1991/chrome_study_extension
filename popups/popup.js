// Work Timer Controls
const startWorkTimerBtn = document.getElementById("start-btn");
const stopWorkTimerBtn = document.getElementById("stop-btn");
const resetWorkTimerBtn = document.getElementById("reset-btn");

// Break Timer Controls
const startBreakTimerBtn = document.getElementById("break-start");
const stopBreakTimerBtn = document.getElementById("break-end");
const resetBreakTimerBtn = document.getElementById("break-reset");
// Event listener to start the timer
startWorkTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isWorkRunning: true,
    });
});

// Function to stop the work timer
stopWorkTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isWorkRunning: false,
    });
});

// Function to reset the work timer
resetWorkTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        workTimer: 0,
        isWorkRunning: false,
    });
});

// Function to update the work timer display
function updateWorkTimerDisplay() {
    chrome.storage.local.get(["workTimer", "timeOption"], (res) => {
        const workTime = document.getElementById("time");

        const totalSeconds = res.timeOption * 60 - res.workTimer; // Calculate total seconds remaining

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        workTime.textContent = `${formattedMinutes}:${formattedSeconds}`

        if (minutes === 0 && seconds === 0) {
            // Reset the work timer to 60 seconds (01:00) before starting the break timer

            stopWorkTimer();
            startBreakTimer();
        }
    });
}

// Update the work timer display initially and on interval
updateWorkTimerDisplay();
setInterval(updateWorkTimerDisplay, 1000);

//function to stop the work timer and set it to 00:00
function stopWorkTimer() {
    chrome.storage.local.set({
        worktTimer: 0,
        isWorkRunning: false
    })
}


// Function to start the break timer
startBreakTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isBreakRunning: true, // Use a different key for break timer
    });
});

// Function to stop the break timer
stopBreakTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isBreakRunning: false, // Use a different key for break timer
    });
});

// Function to reset the break timer
resetBreakTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isBreakRunning: false, // Use a different key for break timer
        breakTimer: 0, // Use a different key for break timer
    });
});

// Function to update the break timer display
function updateBreakTimerDisplay() {
    chrome.storage.local.get(["breakTimer", "breakOption"], (res) => {
        const breakTime = document.getElementById("break");
        const totalSeconds = res.breakOption * 60 - res.breakTimer; // Calculate total seconds remaining

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        breakTime.textContent = `${formattedMinutes}:${formattedSeconds}`;

        if (minutes === 0 && seconds === 0) {
            stopBreakTimer();
        }
    });
}
function startBreakTimer() {
    chrome.storage.local.set({
        isBreakRunning: true,

    });
}
function stopBreakTimer() {
    chrome.storage.local.set({
        isBreakRunning: false,
        breakTimer: 0,
        workTimer: 0,
        isWorkRunning: true,
    })
}

// Update the break timer display initially and on interval
updateBreakTimerDisplay();
setInterval(updateBreakTimerDisplay, 1000);

//Work Timer Control Buttons
const startBtn = document.getElementById("start-btn")
const stopBtn = document.getElementById("stop-btn")
const resetBtn = document.getElementById("reset-btn")

//Rest Timer Control Buttons

const startBreakBtn = document.getElementById("break-start")
const stopBreakBtn = document.getElementById("break-stop")
const resetBreakBtn = document.getElementById("break-reset")

//Event listener to start the timer when button is pressed

startBtn.addEventListener("click", () => {
    //set event to true
    chrome.storage.local.set({
        isWorkRunning: true,
    })
});
//Event listener to stop the timer
stopBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isWorkRunning: false,
    })
})

//Event listener to reset the work timer
resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        workTimer: 0,
        isWorkRunning: false
    })
});

//Function to update the work timer display

function updateWorkTimerDisplay() {
    chrome.storage.local.get(["workTimer"], (res) => {
        const workTime = document.getElementById("work-time"); // Grab the element we need
        let totalSeconds = 60 - res.workTimer; // Calculate the total seconds remaining

        if (totalSeconds < 0) {
            totalSeconds = 0; // Ensure the timer doesn't go below 00:00
        }

        const minutes = Math.floor(totalSeconds / 60); // Calculate the minutes
        const seconds = totalSeconds % 60; // Calculate the seconds

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`; // Format minutes
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`; // Format seconds

        workTime.textContent = `${formattedMinutes}:${formattedSeconds}`; // Display time
        if (minutes === 0 && seconds === 0) {
            stopWorkTimer();
        }
    })
}

updateWorkTimerDisplay();
setInterval(updateWorkTimerDisplay, 1000)// call the function we created and increment by one second

//function to stop the timer when it reaches 00:00
function stopWorkTimer() {
    chrome.storage.local.set({
        workTimer: 0,
        isWorkRunning: false,
    })
}
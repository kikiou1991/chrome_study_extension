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

//Event lustener to reset the work timer
stopBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        workTimer: 0,
        isWorkRunning: false
    })
});

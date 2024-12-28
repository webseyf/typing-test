// timer.js

let timerInterval;
let timeRemaining;
let isRunning = false; // Track if the timer is running

// Function to start the timer
export function startTimer(initialDuration, updateCallback, endCallback) {
    if (isRunning) {
        console.warn("Timer is already running.");
        return; // Avoid starting the timer again if it's already running
    }

    // Validate the initial duration
    if (typeof initialDuration !== 'number' || initialDuration <= 0) {
        console.error("Invalid duration. Please provide a positive number.");
        return;
    }

    timeRemaining = initialDuration;
    isRunning = true;

    updateCallback(formatTime(timeRemaining)); // Initial update
    
    timerInterval = setInterval(() => {
        timeRemaining--;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            endCallback(); // Call the end callback when the timer reaches 0
        } else {
            updateCallback(formatTime(timeRemaining)); // Update the time remaining
        }
    }, 1000);
}

// Function to stop the timer manually
export function stopTimer() {
    if (!isRunning) {
        console.warn("Timer is not running.");
        return; // Avoid stopping the timer if it's not running
    }
    
    clearInterval(timerInterval);
    isRunning = false;
}

// Function to pause the timer
export function pauseTimer() {
    if (!isRunning) {
        console.warn("Timer is not running.");
        return; // Avoid pausing if the timer is not running
    }

    clearInterval(timerInterval);
    isRunning = false;
}

// Function to resume the timer
export function resumeTimer(updateCallback, endCallback) {
    if (isRunning) {
        console.warn("Timer is already running.");
        return; // Avoid resuming if it's already running
    }

    if (timeRemaining <= 0) {
        console.error("Cannot resume. Timer has already ended.");
        return;
    }

    startTimer(timeRemaining, updateCallback, endCallback); // Resume with the remaining time
}

// Helper function to format the time as mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

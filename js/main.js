// Importing necessary functions from other modules
import { getRandomText } from './data/text-data.js';

// Elements from the HTML
const startButton = document.getElementById('startButton');
const userInput = document.getElementById('userInput');
const testParagraph = document.getElementById('testParagraph');
const countdown = document.getElementById('timeLeft');
const resultsSection = document.getElementById('results');
const wpmResult = document.getElementById('wpm');
const accuracyResult = document.getElementById('accuracy');
const errorsResult = document.getElementById('errors');
const retryButton = document.getElementById('retryButton');
const feedback = document.getElementById('feedback');

// Test Settings
let testDuration = 60; // Default duration (1 minute)
let difficulty = 'easy'; // Default difficulty
let timerInterval;
let timeRemaining;
let startTime;
let isTestRunning = false;
let correctChars = 0;
let incorrectChars = 0;
let totalChars = 0;

// Event Listeners
startButton.addEventListener('click', startTest);
retryButton.addEventListener('click', retryTest);

// Functions

// Start the typing test
function startTest() {
    if (isTestRunning) return; // Prevent multiple test starts
    
    // Get selected duration and difficulty
    testDuration = parseInt(document.getElementById('duration').value);
    difficulty = document.getElementById('difficulty').value;
    
    // Disable controls during the test
    document.getElementById('duration').disabled = true;
    document.getElementById('difficulty').disabled = true;
    startButton.disabled = true;
    
    // Set the test paragraph
    testParagraph.textContent = getRandomText(difficulty);
    
    // Enable input field for typing
    userInput.disabled = false;
    userInput.value = '';
    userInput.focus();

    // Start the countdown timer
    timeRemaining = testDuration;
    startTimer();

    // Reset counters
    correctChars = 0;
    incorrectChars = 0;
    totalChars = 0;

    isTestRunning = true;
}

// Start the countdown timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Update the timer
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeRemaining = testDuration - elapsedTime;

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endTest();
    }

    // Format time as mm:ss
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    countdown.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// End the typing test
function endTest() {
    isTestRunning = false;
    userInput.disabled = true; // Disable input after test ends

    // Show results
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    const errors = calculateErrors();

    // Display Results
    wpmResult.textContent = `Words per minute: ${wpm}`;
    accuracyResult.textContent = `Accuracy: ${accuracy}%`;
    errorsResult.textContent = `Errors: ${errors}`;
    
    // Provide feedback
    provideFeedback(wpm, accuracy);

    // Show the results section
    resultsSection.classList.remove('hidden');
}

// Calculate Words per Minute (WPM)
function calculateWPM() {
    const timeInMinutes = timeRemaining / 60;
    const typedWords = userInput.value.trim().split(/\s+/).length;
    return Math.round(typedWords / timeInMinutes);
}

// Calculate accuracy (correct characters / total characters)
function calculateAccuracy() {
    const correctPercentage = (correctChars / totalChars) * 100;
    return Math.round(correctPercentage) || 0; // Avoid NaN if no characters are typed
}

// Calculate number of errors (incorrect characters)
function calculateErrors() {
    return incorrectChars;
}

// Provide feedback based on typing performance
function provideFeedback(wpm, accuracy) {
    if (accuracy < 80) {
        feedback.innerHTML = "<p>Focus on accuracy!</p>";
    } else if (wpm < 30) {
        feedback.innerHTML = "<p>Great speed, but try to improve accuracy!</p>";
    } else {
        feedback.innerHTML = "<p>Great job! Keep practicing!</p>";
    }
}

// Handle user input and check each typed character
userInput.addEventListener('input', () => {
    const typedText = userInput.value;
    const testText = testParagraph.textContent;
    let matchCount = 0;
    
    // Loop through each character and compare to the test text
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === testText[i]) {
            matchCount++;
            correctChars++;
        } else {
            incorrectChars++;
        }
        totalChars++;
    }

    // Highlight correct/incorrect characters in real-time (simple logic)
    const typedTextArray = typedText.split('');
    const highlightedText = typedTextArray.map((char, index) => {
        if (char === testText[index]) {
            return `<span style="color: green">${char}</span>`; // Correct character
        } else {
            return `<span style="color: red">${char}</span>`; // Incorrect character
        }
    }).join('');

    // Update the test paragraph with highlighted characters
    testParagraph.innerHTML = highlightedText;
});

// Retry the test
function retryTest() {
    // Hide results and reset the UI
    resultsSection.classList.add('hidden');
    document.getElementById('duration').disabled = false;
    document.getElementById('difficulty').disabled = false;
    startButton.disabled = false;
}

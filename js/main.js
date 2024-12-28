// Importing necessary functions
import { getRandomChallengeText } from '../data/text-data.js';
import { startTimer, stopTimer } from './timer.js';
import { formatNumberWithCommas, validateDifficultyInput } from './utils.js';
import { provideRealTimeFeedback, provideEndTestSuggestions } from './feedback.js';

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

// Progress Bar Elements
const progressBar = document.getElementById('progressBar');

// Test Settings
let testDuration = 60; // Default duration (1 minute)
let difficulty = 'easy'; // Default difficulty
let challengeCategory = 'quotes'; // Default challenge category
let isTestRunning = false;
let correctChars = 0;
let incorrectChars = 0;
let totalChars = 0;

// Event Listeners
startButton.addEventListener('click', startTest);
retryButton.addEventListener('click', retryTest);
userInput.addEventListener('input', handleUserInput);

// Functions

// Start the typing test
function startTest() {
    console.log('Start button clicked');
    if (isTestRunning) return;

    // Get selected duration, difficulty, and challenge category
    testDuration = parseInt(document.getElementById('duration').value);
    difficulty = document.getElementById('difficulty').value;
    challengeCategory = document.getElementById('challengeCategory').value;

    console.log('Test Duration:', testDuration, 'Difficulty:', difficulty, 'Category:', challengeCategory);

    // Validate difficulty input
    if (!validateDifficultyInput(difficulty)) {
        alert('Invalid difficulty selected. Please choose a valid level.');
        return;
    }

    // Disable controls during the test
    toggleControls(true);

    // Set the test paragraph based on the selected challenge
    testParagraph.textContent = getRandomChallengeText(challengeCategory);

    // Reset UI and variables
    resetTestState();
    userInput.disabled = false;
    userInput.value = '';

    // Focus the input field to allow typing immediately
    userInput.focus();

    // Start the timer
    console.log('Starting the timer...');
    startTimer(testDuration, updateTimer, endTest);

    isTestRunning = true;
}

// Reset test state
function resetTestState() {
    correctChars = 0;
    incorrectChars = 0;
    totalChars = 0;
    resultsSection.classList.add('hidden');
    feedback.textContent = '';
}

// Handle user input and validate typing
function handleUserInput() {
    const typedText = userInput.value;
    const testText = testParagraph.textContent;

    correctChars = 0;
    incorrectChars = 0;
    totalChars = typedText.length;

    // Highlight correct and incorrect characters
    const highlightedText = Array.from(typedText).map((char, index) => {
        if (char === testText[index]) {
            correctChars++;
            return `<span style="color: green">${char}</span>`;
        } else {
            incorrectChars++;
            return `<span style="color: red">${char}</span>`;
        }
    }).join(''); 

    // Update the test paragraph with highlighted text
    testParagraph.innerHTML = highlightedText + testText.slice(typedText.length);

    // Update feedback in real-time
    const accuracy = calculateAccuracy(); // Dynamic accuracy calculation
    const errors = calculateErrors(); // Dynamic errors calculation
    provideRealTimeFeedback(accuracy, errors, feedback); // Function to update feedback UI

    // Show accuracy and errors in UI
    accuracyResult.textContent = `Accuracy: ${accuracy}%`;
    errorsResult.textContent = `Errors: ${errors}`;
}

// End the typing test
function endTest() {
    isTestRunning = false;
    userInput.disabled = true;

    // Stop the timer
    stopTimer();

    // Reset progress bar to 100%
    progressBar.style.width = '100%';

    // Calculate and display results
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    const errors = calculateErrors();

    wpmResult.textContent = `Words per minute: ${formatNumberWithCommas(wpm)}`;
    accuracyResult.textContent = `Accuracy: ${accuracy}%`;
    errorsResult.textContent = `Errors: ${errors}`;

    // Provide end-of-test suggestions
    provideEndTestSuggestions(wpm, accuracy, feedback);

    resultsSection.classList.remove('hidden');
    toggleControls(false);
}

// Calculate Words Per Minute (WPM)
function calculateWPM() {
    const minutes = testDuration / 60;
    const words = userInput.value.trim().split(/\s+/).length;
    return Math.round(words / minutes);
}

// Calculate accuracy
function calculateAccuracy() {
    return totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
}

// Calculate number of errors
function calculateErrors() {
    return incorrectChars;
}

// Retry the test
function retryTest() {
    stopTimer();
    countdown.textContent = '00:00';
    resetTestState();
    toggleControls(false);

    // Focus the input field again after resetting the test
    userInput.focus();
}

// Toggle controls (Enable/Disable dropdowns and buttons)
function toggleControls(disable) {
    document.getElementById('duration').disabled = disable;
    document.getElementById('difficulty').disabled = disable;
    document.getElementById('challengeCategory').disabled = disable;
    startButton.disabled = disable;
}

// Update the progress bar based on the remaining time
function updateProgressBar(timeLeft) {
    const percentage = (timeLeft / testDuration) * 100; // Calculate the remaining time as a percentage
    progressBar.style.width = `${percentage}%`; // Set the width of the progress bar
}

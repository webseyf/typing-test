/**
 * Provides real-time feedback based on typing speed and accuracy.
 * 
 * @param {number} wpm - Words per minute.
 * @param {number} accuracy - Typing accuracy percentage.
 * @param {HTMLElement} feedbackElement - The DOM element where feedback is displayed.
 */
export function provideRealTimeFeedback(wpm, accuracy, feedbackElement) {
    // Input validation to ensure valid numbers
    if (typeof wpm !== 'number' || typeof accuracy !== 'number') {
        console.error('Invalid input: wpm and accuracy must be numbers.');
        return;
    }

    let feedbackMessage = '';

    if (accuracy < 80) {
        feedbackMessage = "Try to type more accurately. Focus on each character!";
    } else if (wpm < 30) {
        feedbackMessage = "You're typing accurately. Now aim to increase your speed.";
    } else {
        feedbackMessage = "Excellent! You're typing with good speed and accuracy. Keep it up!";
    }

    // Ensure feedbackElement is valid before modifying it
    if (feedbackElement) {
        feedbackElement.textContent = feedbackMessage;
    } else {
        console.error('Feedback element not found!');
    }
}

/**
 * Provides end-of-test suggestions for improvement based on user performance.
 * 
 * @param {number} wpm - Words per minute.
 * @param {number} accuracy - Typing accuracy percentage.
 * @param {HTMLElement} feedbackElement - The DOM element where feedback is displayed.
 */
export function provideEndTestSuggestions(wpm, accuracy, feedbackElement) {
    // Input validation to ensure valid numbers
    if (typeof wpm !== 'number' || typeof accuracy !== 'number') {
        console.error('Invalid input: wpm and accuracy must be numbers.');
        return;
    }

    let feedbackMessage = '';

    if (accuracy < 80) {
        feedbackMessage = "Your accuracy is below 80%. Focus on reducing typing errors by typing slower and more carefully.";
    } else if (wpm < 30) {
        feedbackMessage = "Good job on accuracy! Work on increasing your speed by practicing frequently.";
    } else {
        feedbackMessage = "Great performance! Your speed and accuracy are excellent. Keep practicing to stay sharp.";
    }

    // Ensure feedbackElement is valid before modifying it
    if (feedbackElement) {
        feedbackElement.textContent = feedbackMessage;
    } else {
        console.error('Feedback element not found!');
    }
}

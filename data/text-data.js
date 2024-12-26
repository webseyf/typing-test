// text-data.js

// Easy text examples
const easyText = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be, or not to be, that is the question.",
  "Every cloud has a silver lining.",
  "Practice makes perfect."
];

// Moderate text examples
const moderateText = [
  "In the middle of difficulty lies opportunity.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Believe you can and you're halfway there."
];

// Advanced text examples
const advancedText = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "Life is what happens when you're busy making other plans.",
  "When the going gets tough, the tough get going.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "The best and most beautiful things in the world cannot be seen or even touched—they must be felt with the heart."
];

// Function to get random text based on difficulty level
function getRandomText(difficulty) {
  let textArray;

  switch (difficulty) {
      case 'easy':
          textArray = easyText;
          break;
      case 'moderate':
          textArray = moderateText;
          break;
      case 'advanced':
          textArray = advancedText;
          break;
      default:
          textArray = easyText; // Default to easy if no difficulty is selected
          break;
  }

  const randomIndex = Math.floor(Math.random() * textArray.length);
  return textArray[randomIndex];
}

// Export the function to be used in other scripts
export { getRandomText };

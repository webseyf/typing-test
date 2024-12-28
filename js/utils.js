// utils.js

// Function to generate a random number within a range
export function getRandomInt(min, max) {
  // Ensure min and max are integers and min <= max
  if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
    throw new Error('Invalid range');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to shuffle an array (Fisher-Yates Shuffle Algorithm)
export function shuffleArray(array) {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i); // Use getRandomInt to ensure randomness
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  return array;
}

// Function to capitalize the first letter of a string
export function capitalizeFirstLetter(string) {
  if (typeof string !== 'string') {
    throw new Error('Expected a string');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to format large numbers with commas (e.g., 1000 -> 1,000)
export function formatNumberWithCommas(number) {
  if (typeof number !== 'number') {
    throw new Error('Expected a number');
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to debounce user input events
export function debounce(func, delay) {
  if (typeof func !== 'function') {
    throw new Error('Expected a function');
  }
  if (typeof delay !== 'number' || delay < 0) {
    throw new Error('Invalid delay');
  }

  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// Function to validate test difficulty input
export function validateDifficultyInput(difficulty) {
  const validDifficulties = ['easy', 'moderate', 'advanced'];
  if (typeof difficulty !== 'string') {
    throw new Error('Expected a string');
  }
  return validDifficulties.includes(difficulty);
}

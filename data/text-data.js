// Text examples for different categories and difficulties
const textExamples = {
  easy: {
    quotes: [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "To be, or not to be, that is the question.",
      "Every cloud has a silver lining.",
      "Practice makes perfect."
    ],
    words: ["apple", "banana", "carrot", "dog", "elephant", "fish", "grape", "house", "internet", "jungle"],
    stories: [
      "Once upon a time, there was a small village by the sea.",
      "A brave knight embarked on a quest to save the kingdom.",
      "In a faraway land, a young princess found a magical book.",
      "A curious child discovered an enchanted forest.",
      "An old man with a mysterious past came to town."
    ]
  },
  moderate: {
    quotes: [
      "In the middle of difficulty lies opportunity.",
      "The only way to do great work is to love what you do.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "It does not matter how slowly you go as long as you do not stop.",
      "Believe you can and you're halfway there."
    ],
    words: ["adventure", "challenge", "knowledge", "persistence", "courage", "patience", "vision", "success", "growth"],
    stories: [
      "The hero wandered through a dense jungle, searching for the lost city of gold.",
      "A young detective solved the mystery of the vanishing cat in the small town.",
      "A scientist discovered a hidden dimension while exploring the depths of space.",
      "A group of explorers trekked through harsh conditions to find the lost temple.",
      "The wizard cast a spell that sent the villagers into another world."
    ]
  },
  advanced: {
    quotes: [
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      "Life is what happens when you're busy making other plans.",
      "When the going gets tough, the tough get going.",
      "Success is not how high you have climbed, but how you make a positive difference to the world.",
      "The best and most beautiful things in the world cannot be seen or even touched—they must be felt with the heart."
    ],
    words: ["transcendence", "philosophy", "serendipity", "quantum", "subconscious", "introspection", "idiosyncrasy", "consciousness"],
    stories: [
      "In a distant future, humanity colonized the stars, exploring new worlds and encountering alien life forms.",
      "A philosopher pondered the nature of existence, seeking answers in the vastness of the universe.",
      "An explorer journeyed into the unknown, discovering hidden civilizations beneath the surface of the earth.",
      "A revolution took place, changing the course of history and redefining the concept of freedom.",
      "A brilliant scientist uncovered the key to immortality, but at a great personal cost."
    ]
  }
};

// Predefined Text Challenges (Quotes and Paragraphs)
const typingChallenges = {
  quotes: [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Believe you can and you're halfway there."
  ],
  paragraphs: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    "This is an example of a longer paragraph to test your typing speed and accuracy. Keep typing.",
    "Coding is a fun and creative way to solve real-world problems. The more you practice, the better you get.",
    "Typing tests help to improve typing skills. With each practice session, your speed and accuracy improve.",
    "The future belongs to those who believe in the beauty of their dreams."
  ]
};

// Function to get random text based on selected challenge category
function getRandomChallengeText(category) {
  const textArray = typingChallenges[category] || [];
  
  // Select a random challenge from the selected category
  return textArray[Math.floor(Math.random() * textArray.length)];
}

// Export the function to be used in other scripts
export { getRandomChallengeText };

// Function to get random text based on category and difficulty level
function getRandomText(category, difficulty) {
  const textArray = textExamples[difficulty]?.[category] || textExamples.easy[category];

  // Select a random text from the category and difficulty
  return textArray[Math.floor(Math.random() * textArray.length)];
}

// Export the function to be used in other scripts
export { getRandomText };

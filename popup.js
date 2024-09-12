document.addEventListener('DOMContentLoaded', () => {
  const jokeElement = document.querySelector('.joke');

  const jokes = [
    "Why don’t skeletons fight each other? They don’t have the guts!",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "Did you hear about the mathematician who’s afraid of negative numbers? He’ll stop at nothing to avoid them!",
    "Why don’t scientists trust atoms? Because they make up everything!",
    "What’s a computer’s favorite snack? Microchips!"
  ];

  // Display a random joke
  jokeElement.textContent = jokes[Math.floor(Math.random() * jokes.length)];

  // Snooze button functionality
  document.querySelector('.snooze').addEventListener('click', () => {
    chrome.alarms.clear('breakReminder', () => {
      chrome.alarms.create('breakReminder', { delayInMinutes: 5 });
      window.close();
    });
  });

  // Cancel button functionality
  document.querySelector('.cancel').addEventListener('click', () => {
    chrome.alarms.clear('breakReminder', () => {
      window.close();
    });
  });
});

# Mobile Flashcards Project

This is the code for the final assessment project for Udacity's React Native course.

## Views 
There are few views:

### Deck List View

Displays the title of each deck and the number of cards in each deck.

### Individual Deck View

Displays:
 - the title of the Deck;
 - the number of cards in the deck;
 - an option to start a quiz on this specific deck;
 - an option to add a new question to the deck;
 - an option to delete Deck

### Quiz View

Displays:
 - a card question;
 - an option to view the answer (flips the card);
 - a "Correct" button;
 - an "Incorrect" button;
 - the number of cards left in the quiz;
 - the score once the quiz is complete

### New Deck View

Displays: 
 - an option to enter in the title for the new deck;
 - an option to submit the new deck title

### New Question View

Displays: 
 - an option to enter in the question;
 - an option to enter in the answer;
 - an option to submit the new question

## Data
To store decks and flashcards `AsyncStorage` is used.

Each deck creates a new key on the object. 
Each deck has a `title` and a `questions key. 
`Title` is the title for the specific deck.
`Questions` is an array of questions and answers for that deck.

Project starts with the test data: 

<pre>
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
</pre>

## Notifications 

Logic for notification has been implemented. Notifications are generated at a specific time if the user hasn't completed at least one quiz for that day.

### Supported platforms
iOS, Android

### Fast start
Clone the repository: `git clone https://github.com/AnitaChess/mobile-flashcards.git`

In the project directory, you can run:
- `npm install` (install dependencies)
- `expo start` (launch the project, scan the QR-code from your phone)

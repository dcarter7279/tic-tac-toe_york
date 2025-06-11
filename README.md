React Tic-Tac-Toe Game

This is a classic Tic-Tac-Toe game built with React. It's a simple, interactive application designed to showcase fundamental React concepts, including components, state management with hooks, and event handling.

Features

Interactive Gameplay: A fully playable 3x3 Tic-Tac-Toe board.

Player Turns: The game indicates whose turn is next ('X' or 'O').

Winner Detection: The application automatically declares a winner or a draw.

Game History: Players can review the history of moves and "time travel" to previous states of the game.

Restart Game: A button to easily reset the game to its initial state.

Responsive Design: The interface is designed to work well on different screen sizes.

Getting Started

To get a local copy up and running, follow these simple steps.

Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine. You can download them from nodejs.org.

Installation & Running

Clone the repository (or download the code files).

Navigate to the project directory:

cd your-project-directory

Install NPM packages:

npm install

Run the app in development mode:

npm start

This will open the app in your default browser at http://localhost:3000.

Built With

React: A JavaScript library for building user interfaces.

JavaScript : The programming language used.

HTML5 & CSS3: For structure and styling.

How It Works

The application is structured into several key components:

App: The main component that manages the overall game state, including the history of moves.

Board: Renders the 3x3 grid and manages the state of the squares.

Square: Represents a single clickable square on the board.

State is managed using the useState hook. When a player makes a move, the handlePlay function updates the game's history, and the UI re-renders to reflect the new state. The calculateWinner helper function is called after every move to check for a victory condition.

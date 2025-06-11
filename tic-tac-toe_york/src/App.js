import React, { useState } from "react";

// The Square component represents a single square on the board
function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-400 h-20 w-20 m-1 rounded-lg text-4xl font-bold text-gray-800 leading-9 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// The Board component renders the 3x3 game board
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Check if the square is already filled or if there's a winner
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "Draw: No Winner";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // Use loops to create the board rows and squares
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squareCols = [];
    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      squareCols.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
        />
      );
    }
    boardRows.push(
      <div key={row} className="flex">
        {squareCols}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold mb-4 text-white">{status}</div>
      <div>{boardRows}</div>
    </div>
  );
}

// Main App component which acts as the Game controller
export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className="w-full text-left px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-5xl font-bold text-white mb-8">Tic-Tac-Toe</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
          <button
            onClick={handleRestart}
            className="mt-6 w-full px-4 py-2 text-lg font-semibold text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Restart Game
          </button>
        </div>
        <div className="w-full md:w-64 bg-gray-700 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-bold text-white mb-4">Game History</h2>
          <ol className="list-none">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

// Helper function to determine the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

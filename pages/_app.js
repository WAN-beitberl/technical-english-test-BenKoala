import '../styles/styles.css';
import { useState } from 'react';

// Square function to set square properties.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board main function.
export default function Board() {
  // Handle turns.
  const [xIsNext, setXIsNext] = useState(true);

  // Handle board array.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Restart Game
  function reset(){
    window.location.reload();
} 

  // Handle player click
  function handleClick(i) {
    // Case: slot is occupied || a winner has been declared.
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Case: game is ongoing and slot is unoccupied. 
    // Occopy slot with fitting character in temp array.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // Occupy squeares array.
    setSquares(nextSquares);
    // Shift the turns
    setXIsNext(!xIsNext);
  }

  // Check for win.
  function calculateWinner(squares) {
    // Possible winning states.
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Check if one codition is met.
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Get winner if exists.
  const winner = calculateWinner(squares);
  let status;
  
  // Case: winner exists.
  if (winner) {
    status = "Winner: " + winner + "!";
  } else {
    // Check for draw.
      let slots = 0
      for (let i = 0; i < squares.length && !slots; i++) {
        if (!squares[i]) {
          slots++;
        }
      }
      // Case: draw.
      if (!slots) {
        status = "Draw!"
        // Case: game ongoing.
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  // Return the page elements.
  return (
    <>
      <div className="headline">TicTacToe</div>
      <div className="status">{status}</div>
      <div className='board'>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
    <button className="reset" onClick={reset}>Reset Game</button>
    <div className="credits">©Made By Ben David Ivgi, 2023</div>
    </>
  );
}


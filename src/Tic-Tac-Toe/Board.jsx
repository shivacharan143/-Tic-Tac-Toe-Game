
//Code for only human can play

// import React, { useState } from "react";
// import Square from "./Square";

// const Board = () => {
//   const [state, setState] = useState(Array(9).fill(null));
//   const [isXTurn, setIsXTurn] = useState(true);
  

//   const checkWinner = () => {
//     const winnerLogic = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (let logic of winnerLogic) {
//       const [a, b, c] = logic;
//       if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
//         return state[a];
//       }
//     }
//      //check for a draw
//     if (state.every((square) => square !== null)) {
//       return "Draw";
//     }

//     return false;
//   };

//   const isWinner = checkWinner();

//   const handleClick = (index) => {
//     if (state[index] !== null) {
//       return;
//     }
//     const copyState = [...state];
//     copyState[index] = isXTurn ? "X" : "O";
//     setState(copyState);
//     setIsXTurn(!isXTurn);
//   };

//   const handleReset = () => {
//     setState(Array(9).fill(null));
//   };

//   return (
//     <>
    
//     <div className="board-container">
//        {isWinner ? (
//         <>
//           {isWinner==="Draw"? (
//             <div>The game is Drawn
//               <button onClick={handleReset}>Play Again</button> 
//             </div>
//           ):(<div> won the game{" "}
//               <button onClick={handleReset}>Play Again</button> 
//           </div>)}
           
//         </>
//       ) : (
//         <>
//           <h4>Player {isXTurn ? "X" : "O"} please move</h4>
//           <div className="board-row">
//             <Square onClick={() => handleClick(0)} value={state[0]} />
//             <Square onClick={() => handleClick(1)} value={state[1]} />
//             <Square onClick={() => handleClick(2)} value={state[2]} />
//           </div>
//           <div className="board-row">
//             <Square onClick={() => handleClick(3)} value={state[3]} />
//             <Square onClick={() => handleClick(4)} value={state[4]} />
//             <Square onClick={() => handleClick(5)} value={state[5]} />
//           </div>
//           <div className="board-row">
//             <Square onClick={() => handleClick(6)} value={state[6]} />
//             <Square onClick={() => handleClick(7)} value={state[7]} />
//             <Square onClick={() => handleClick(8)} value={state[8]} />
//           </div>
//         </>
//       )}
//     </div>
//     </>
//   );
// };


//code for human and Computer can play

import React, { useState, useEffect } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  

  const checkWinner = (board) => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
     //check for a draw
    if (board.every((square) => square !== null)) {
      return "Draw";
    }

    return false;
  };

  const isWinner = checkWinner(state);

  const handleClick = (index) => {
    if (state[index] !== null || isWinner) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
  };

  useEffect(() => {
    if (!isXTurn && !isWinner) {
      // Computer's turn
      const bestMove = findBestMove(state);
      handleClick(bestMove);
    }
  }, [isXTurn]);

  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        let newBoard = [...board];
        newBoard[i] = "O";
        let score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const scores = {
    X: -1,
    O: 1,
    Draw: 0,
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = checkWinner(board);
    if (result) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          let newBoard = [...board];
          newBoard[i] = "O";
          let score = minimax(newBoard, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          let newBoard = [...board];
          newBoard[i] = "X";
          let score = minimax(newBoard, depth + 1, true);
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  return (
    <>
      <div className="board-container">
        {isWinner ? (
          <>
            {isWinner === "Draw" ? (
              <div>
                The game is Drawn
                <button onClick={handleReset}>Play Again</button>
              </div>
            ) : (
              <div>
                {isWinner} won the game{" "}
                <button onClick={handleReset}>Play Again</button>
              </div>
            )}
          </>
        ) : (
          <>
            <h4>Player {isXTurn ? "X" : "O"} please move</h4>
            <div className="board-row">
              <Square onClick={() => handleClick(0)} value={state[0]} />
              <Square onClick={() => handleClick(1)} value={state[1]} />
              <Square onClick={() => handleClick(2)} value={state[2]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(3)} value={state[3]} />
              <Square onClick={() => handleClick(4)} value={state[4]} />
              <Square onClick={() => handleClick(5)} value={state[5]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(6)} value={state[6]} />
              <Square onClick={() => handleClick(7)} value={state[7]} />
              <Square onClick={() => handleClick(8)} value={state[8]} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Board;
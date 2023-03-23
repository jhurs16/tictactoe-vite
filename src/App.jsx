import { useState } from 'react'
// import './App.css'
// import Square from './components/Square'
import './styles.scss'
import History from './components/History'
import Board from './components/Board'
import { calculateWinner } from './calculateWinner'
import StatusMessage from './components/StatusMessage'

const NEW_GAME = [
  {squares: Array(9).fill(null), isXNext: false}
]
function App() {

    //for gaming board history
    const [history, setHistory] = useState(NEW_GAME)
    // current move
    const [currentMove, setCurrentMove] = useState(0)
    console.log({history, currentMove})
    // gaming board
    const gamingBoard = history[currentMove]

    
    const {winner, winningSquares } = calculateWinner(gamingBoard.squares)
    const handleSquareClick = (clickedPosition) =>{
   
    // const winner = calculateWinner(gamingBoard.squares)
        if (gamingBoard.squares[clickedPosition] || winner ){
            return;
        }
        setHistory( currentHistory =>{
          const isTraversing = currentMove + 1 !== currentHistory.length;
          const lastGamingState = isTraversing 
            ? currentHistory[currentMove]
            : currentHistory[currentHistory.length - 1]
  
          const nextSquareState = lastGamingState.squares.map((squareValue, position) => {
            if(clickedPosition === position){
              return lastGamingState.isXNext ? 'X' : 'O';
            }
            return squareValue;
          })
          const base = isTraversing
            ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
            : currentHistory;
          return base.concat({ squares: nextSquareState, isXNext: !lastGamingState.isXNext})
        });
        // setIsNext((currentIsNext)=> !currentIsNext)
        //increment current move
        setCurrentMove(move => move + 1)
    }

  const moveTo = (move) => {
    setCurrentMove(move)
  }
  const onNewGameStart = ()=>{
    setHistory(NEW_GAME)
    setCurrentMove(0)
  }
  return (
    <div className='app'>
      <h1>TIC <span className='text-green'>TAC</span> TOE</h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board 
        squares={gamingBoard.squares} 
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button type='button' onClick={onNewGameStart} className={`btn-reset ${winner ? 'active': ''}`}>Start New Game</button>
      <h1>Current History</h1>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
    
  )
}

export default App

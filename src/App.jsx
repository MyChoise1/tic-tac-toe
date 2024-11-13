import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { act, useState } from "react"
import Log from "./components/Log.jsx"
import GameOver from "./components/gameOver.jsx"
import { WINNING_COMBINATIONS } from "./winning-combo.js"

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X'

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function App() {
  const [player, setPayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })

  function winningPlayerName(symbol, newName ) {
    setPayer((prevPlayer) => {
      return{
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

  const [gameTurn, setGameTurn] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')

  let activePlayer = deriveActivePlayer(gameTurn)

  let gameBoard = [...initialGameBoard.map(preArray => [...preArray] )]

  for (const turn of gameTurn) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  let winner

  function gameRestart() {
    setGameTurn([])
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column]
    
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol ){
      winner = player[firstSquareSymbol]
    }
  }

  let hasDraw = gameTurn.length === 9

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X' )
    setGameTurn(prevturn => {
      const currentPlayer = deriveActivePlayer(prevturn)

      const updatedTurns = [{
        square: { row: rowIndex, col: colIndex }, player: currentPlayer
      }, ...prevturn,]

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onSelectName={winningPlayerName} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onSelectName={winningPlayerName} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelect={gameRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}
export default App

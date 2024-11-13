
export default function GameBoard({ onSelectSquare, board }) {


    // const [gameborad, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((preValue) => {
    //         const updatedGame = [...preValue.map(innerArray => [...innerArray])]
    //         updatedGame[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedGame;
    //     })

    //     onSelectSquare()
    // }

    return <ol id="game-board">
        {board.map((row, rowIndex) => (<li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => (<li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                </li>))}
            </ol>
        </li>
        ))}
    </ol>
}
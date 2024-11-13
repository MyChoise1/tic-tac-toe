export default function GameOver({winner, onSelect }) {
    return (
        <div id="game-over">
            <h2>GAME OVER</h2>
            {winner && <p>{winner} WON</p>}
            {!winner && <p>It's a draw</p>}
            <p>
                <button onClick={onSelect}>ReMatch!</button>
            </p>
        </div>
    )
}
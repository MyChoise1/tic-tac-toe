import { useState } from "react"

export default function Player({ name, symbol, isActive, onSelectName }) {
    const [playerName, setPlayerName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)

    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    function Change() {
        setIsEditing((editing) => !editing);

        if (isEditing)
            onSelectName(symbol, playerName)
    }

    let editPlayerName = <span className="player-name">{playerName}</span>


    if (isEditing) {
        editPlayerName = <input type="text" required value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={Change}>{isEditing ? "Save" : "Edit"}</button>
        </li>

    )
}
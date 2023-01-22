import { useState, createContext, useEffect } from "react";
import React from "react";
import { useSocket } from "../socket";

export const GameContext = createContext({});

const GameProvider = ({children}) => {
    const [gameData, setGameData] = useState(null);

    return(
        <GameContext.Provider
            value={{
                gameData, setGameData
            }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;
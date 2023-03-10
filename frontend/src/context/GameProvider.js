import { useState, createContext, useEffect } from "react";
import React from "react";
import { useSocket } from "../socket";

export const GameContext = createContext({});

const GameProvider = ({children}) => {
    const [gameData, setGameData] = useState(null);
    const [currentSelectedCardType, setCurrentSelectedCardType] = useState([]);
    const [currentSelectedCardIndex, setCurrentSelectedCardIndex] = useState([]);

    return(
        <GameContext.Provider
            value={{
                gameData, setGameData,
                currentSelectedCardType, setCurrentSelectedCardType,
                currentSelectedCardIndex, setCurrentSelectedCardIndex
            }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;
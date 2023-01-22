import { useState, createContext, useEffect } from "react";
import React from "react";
import { useSocket } from "../socket";

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
    const [owner, setOwner] = useState(null);
    const [username, setUsername] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [modalType, setModalType] = useState("");
    const [playerList, setPlayerList] = useState([]);
    const [startGame, setStartGame] = useState(false);

    return(
        <GlobalContext.Provider
            value={{
                owner, setOwner,
                username, setUsername, 
                roomId, setRoomId,
                modalType, setModalType,
                playerList, setPlayerList,
                startGame, setStartGame,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
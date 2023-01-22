import { useParams } from "react-router-dom";
import PlayerPosition from "../components/ingame/position/PlayerPosition";
import styled from "styled-components";
import CardDeck from "../components/ingame/card/CardDeck";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlayers, setUsername, setRoomId } from "../reducers/PlayersReducer";
import { setDeskCards} from '../reducers/DeckReducer';
import { useEffect, useState } from 'react';
import { useSocket } from "../socket";
import { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import { GlobalContext } from "../context/GlobalProvider";

const IngamePage = (props) => { 
    const socket = useSocket();
    const { 
        gameData, setGameData
    } = useContext(GameContext);

    const { 
        roomId, setRoomId,
        username, setUsername,
    
    } = useContext(GlobalContext);

    return(
        <div style={{maxHeight: "100vh", overflow: "hidden"}}> 
            <PlayerPosition />
            <CardDeck />
        </div>
    )
};

export default IngamePage;
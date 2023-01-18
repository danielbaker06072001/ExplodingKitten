import { useParams } from "react-router-dom";
import PlayerPosition from "../components/ingame/position/PlayerPosition";
import styled from "styled-components";
import CardDeck from "../components/ingame/card/CardDeck";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import React from "react";

const IngamePage = (props) => { 
    const playerList = useSelector((state) => state.playersReducer.players);
    let { id } = useParams();
    
    if (playerList &&playerList.length > 0) {
        return(
            <div style={{maxHeight: "100vh", overflow: "hidden"}}> 
                <PlayerPosition />
                <CardDeck />
            </div>
        )
    }else {
        socket.emit("join", "" + id);
        return(
        <React.Fragment> </React.Fragment>
        );
    }
};

export default IngamePage;


export const CardDeckStyle = styled.div` 
    
`
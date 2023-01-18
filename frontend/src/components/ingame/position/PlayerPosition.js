import styled from 'styled-components';
import React from "react";
import MainPlayerPosition from "./MainPlayerPosition";
import OtherPlayerPosition from './OtherPlayerPosition';
import { useSelector } from 'react-redux';

const PlayerPosition = (props) => { 
    const playerList = useSelector((state) => state.playersReducer.players);
    const direction = ["west", "north", "east"];
    let playerDirection = [];

    let mainUsername = localStorage.getItem("username");
    let mainPlayerPosition = playerList.findIndex((element) => element.username === mainUsername);
    let playerListSize = playerList.length;

    for (let i = 0; i < playerListSize - 1; i++) {
        let nextPlayerPosition = ( mainPlayerPosition + 1 + i ) % playerListSize;

        console.log(nextPlayerPosition + " " + playerList[nextPlayerPosition].username);

        playerDirection.push({
            direction: direction[i],
            username: playerList[nextPlayerPosition].username
        });
    }

    return(
        <PlayerPositionWrapper>
            <MainPlayerPosition username="test1" />

            {
                playerDirection.map((element, index) => {
                    return (
                        <OtherPlayerPosition key={index} username={element.username} direction={element.direction} />
                    )
                })
            }
        </PlayerPositionWrapper>
    );
};  

const PlayerPositionWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

export default PlayerPosition;
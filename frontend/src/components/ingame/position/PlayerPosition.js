import styled from 'styled-components';
import React from "react";
import MainPlayerPosition from "./MainPlayerPosition";
import OtherPlayerPosition from './OtherPlayerPosition';
import { GameContext } from '../../../context/GameProvider';
import { GlobalContext } from '../../../context/GlobalProvider';
import { useContext } from 'react';

const PlayerPosition = (props) => { 
    const { gameData } = useContext(GameContext);
    const { username } = useContext(GlobalContext);

    const direction = ["west", "north", "east"];
    let playerDirection = [];

    let playerList = gameData.players;
    
    let mainUsername = username;
    let mainPlayerPosition = playerList.findIndex((element) => element.username === mainUsername);
    let playerListSize = playerList.length;

    for (let i = 0; i < playerListSize - 1; i++) {
        let nextPlayerPosition = ( mainPlayerPosition + 1 + i ) % playerListSize;

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
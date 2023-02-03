import styled from "styled-components";
import { useContext } from "react";
import { GameContext } from "../../../context/GameProvider";
import { GlobalContext } from "../../../context/GlobalProvider";
import { useSocket } from "../../../socket";
import MainCardList from "../card/MainCardList";

const OtherPlayerPosition = (props) => {
  const socket = useSocket();
    const { gameData } = useContext(GameContext);
    const { username, roomId } = useContext(GlobalContext);
    let direction = props.direction;

    function requestFavor(target) { 
      socket.emit("request", {
        type:"REQUEST_FAVOR",
        data:{
            username: username,
            roomId: roomId,
            target: target
        }
    });
      return;
    }

    let usernameText = props.username;
    if (gameData.deadPlayers.includes(usernameText)) {
      usernameText = usernameText + " DEAD";
    }

    const player = gameData.players.find((player) => 
        player.username === usernameText
    );

    let hidden = true;

    if (username === gameData.currentTurnUsername && gameData.threeComboTurn) {
      hidden = false;
    }

    if (gameData.favorTurn && username === gameData.currentTurnUsername) {
      return (        
          <Wrapper className={direction}>
            <div> 
              {props.children} {usernameText} 
              <button onClick = {(e) => requestFavor(props.username)}> Favor </button>
            </div>
          
            <MainCardList username={usernameText} cards={player.cards} socket = {socket} direction={direction} hidden={hidden}> </MainCardList> 
          </Wrapper>
      );
    }else {
      return (        
          <Wrapper className={direction}>
            <div> 
              {props.children} {usernameText} 
            </div>

            <MainCardList username={usernameText} cards={player.cards} socket = {socket} direction={direction} hidden={hidden}> </MainCardList> 
          </Wrapper>
      );
    }
};

const Wrapper = styled.div`
  width: 250px;
  height: 100px;
  background-color: lightblue;

  position: absolute;
  
  &.north {
      top: 0px;
      left: 50vw;
      transform: translate(-50%, 0);
  }

  &.west { 
    top: 40vh;
    left: 0px;
    transform: translate(0%, -50%);
  }

  &.east { 
    top: 40vh;
    right: 0px;
    transform: translate(0%, -50%);
  }
`

export default OtherPlayerPosition;
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerSession } from '../../../reducers/PlayersReducer';
import { connect } from 'react-redux';
import MainCardList from '../card/MainCardList';
import { useSocket } from '../../../socket';
import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalProvider';
import { GameContext } from '../../../context/GameProvider';

const MainPlayerPosition = (props) => {
    const socket = useSocket();
    const { username, roomId } = useContext(GlobalContext);
    const { gameData } = useContext(GameContext);
    const { currentSelectedCardType, setCurrentSelectedCardType } = useContext(GameContext);
    const { currentSelectedCardIndex, setCurrentSelectedCardIndex } = useContext(GameContext);
    
    const player = gameData.players.find((player) => 
        player.username === username
    );

    function requestPlayCard() { 
        socket.emit("request", {
            type:"REQUEST_PLAY_CARD",
            data:{
                username: username,
                roomId: roomId,
                cards: currentSelectedCardType,
                cardIndexes: currentSelectedCardIndex,
            }
        });
    }

    function requestDrawCard() { 
        socket.emit("request", {
            type: "REQUEST_DRAW_CARD", 
            data:{ 
                username: username,
                roomId: roomId
            }
        });
    }

    function requestPlayNope() { 
        socket.emit("request", {
            type: "REQUEST_PLAY_NOPE", 
            data:{ 
                username: username,
                roomId: roomId
            }
        });
    }

    function requestPassNope() { 
        socket.emit("request", {
            type: "REQUEST_PASS_NOPE", 
            data:{ 
                username: username,
                roomId: roomId
            }
        });
    }

    function requestGiveFavorCard() { 
        socket.emit("request", {
            type: "REQUEST_GIVE_FAVOR_CARD", 
            data:{ 
                username: username,
                roomId: roomId,
                cards: currentSelectedCardType,
                cardIndexes: currentSelectedCardIndex,
            }
        });
    }


    let notice = null;
    if (gameData.favorTurn && gameData.favorTarget === username) {
        notice = gameData.currentTurnUsername === username ? "Your turn left: " + gameData.currentTurnDraw : gameData.currentTurnUsername + " Left: " + gameData.currentTurnDraw;
    }else {
        notice = gameData.currentTurnUsername === username ? "Your turn left: " + gameData.currentTurnDraw : gameData.currentTurnUsername + " Left: " + gameData.currentTurnDraw;
    }

    if (gameData.deadPlayers.includes(username)) {
        notice = "DEAD";
    }

    if(notice !== "DEAD") { 
        if (gameData.favorTurn && gameData.favorTarget === username) {
            return (
                <Wrapper>
                    <Content>
                        <NopeWrapper>
                            {/* <ButtonStyle onClick onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle> */}
                            <ButtonStyle onClick={(e) => {requestPlayNope()}}>Nope</ButtonStyle>
                            <ButtonStyle onClick={(e) => {requestPassNope()}}>Pass</ButtonStyle>
                        </NopeWrapper>
        
                        <MainCardList username={username} cards={player.cards} socket = {socket} hidden={false}/>
        
                        <ButtonWrapper>
                            {/* <ButtonStyle onClick onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle> */}
                            <ButtonStyle> { notice } </ButtonStyle>
                            
                            <ButtonStyle onClick={(e) => {requestDrawCard()}}>Draw Card</ButtonStyle>
                            <ButtonStyle onClick = {(e) => {requestGiveFavorCard()}}>Favor Card</ButtonStyle>
                        </ButtonWrapper>
                    </Content>
                </Wrapper>
            );
        }else {
            return (
                <Wrapper>
                    <Content>
                        <NopeWrapper>
                            {/* <ButtonStyle onClick onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle> */}
                            <ButtonStyle onClick={(e) => {requestPlayNope()}}>Nope</ButtonStyle>
                            <ButtonStyle onClick={(e) => {requestPassNope()}}>Pass</ButtonStyle>
                        </NopeWrapper>
        
                        <MainCardList username={username} cards={player.cards} socket = {socket} hidden={false}/>
        
                        <ButtonWrapper>
                            {/* <ButtonStyle onClick onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle> */}
                            <ButtonStyle> { notice } </ButtonStyle>
                            
                            <ButtonStyle onClick={(e) => {requestDrawCard()}}>Draw Card</ButtonStyle>
                            <ButtonStyle onClick = {(e) => {requestPlayCard()}}>Play Card</ButtonStyle>
                        </ButtonWrapper>
                    </Content>
                </Wrapper>
            );
        }
    }else { 
        return (
            <Wrapper>
                <Content>
                    <NopeWrapper>
                        {/* <ButtonStyle onClick onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle> */}
                        <ButtonStyle onClick={(e) => {requestPlayNope()}}>Nope</ButtonStyle>
                        <ButtonStyle onClick={(e) => {requestPassNope()}}>Pass</ButtonStyle>
                    </NopeWrapper>
    
                    <MainCardList username={username} cards={player.cards} socket = {socket} hidden={false}/>
    
                    <ButtonWrapper>
                        {/* <ButtonStyle onClick onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle> */}
                        <ButtonStyle> { notice } </ButtonStyle>
                    </ButtonWrapper>
                </Content>
            </Wrapper>
        );
    }
};

export default MainPlayerPosition;

const Wrapper = styled.div`
  width: 100vw;
  height: 200px;
  background-color: unset;

  position: absolute;
  bottom: 0px;
  left: 50vw;

  transform: translate(-50%, 0);
`

const Content  = styled.div`
  position: relative;
  height: 100%;
`

const NopeWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0px;
    height: 100%;
    gap: 50px;
    padding: 25px 50px;   
    align-items : center;
`

const ButtonWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0px;
    height: 100%;
    gap: 25px;
    padding: 25px 50px;   
    align-items : center;
`

const ButtonStyle = styled.button`
    width: 100px;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0 6px #666;
    cursor: pointer;

    &:hover{ 
        background-color: lightgrey;
    }

    &:active { 
        background-color: #CFE4C3;
        box-shadow: 0 3px #666;
        transform: translateY(3px);
    }
`

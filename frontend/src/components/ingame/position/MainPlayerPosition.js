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
    const { currentSelectedCard, setCurrentSelectedCard } = useContext(GameContext);
    
    const player = gameData.players.find((player) => 
        player.username === username
    );

    function requestPlayCard() { 
        socket.emit("request", {
            type:"REQUEST_PLAY_CARD",
            data:{
                username: username,
                roomId: roomId,
                cards: currentSelectedCard
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

    return (
        <Wrapper>
            <Content>
                <MainCardList cards={player.cards} socket = {socket}/>

                <ButtonWrapper>
                    {/* <ButtonStyle onClick onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle> */}
                    <ButtonStyle onClick={(e) => {requestDrawCard()}}>Draw Card</ButtonStyle>
                    <ButtonStyle onClick = {(e) => {requestPlayCard()}}>Play Card</ButtonStyle>
                </ButtonWrapper>
            </Content>
        </Wrapper>
    );
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

const ButtonWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0px;
    height: 100%;
    gap: 50px;
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

const PlayerCard = styled.div ` 
    
`
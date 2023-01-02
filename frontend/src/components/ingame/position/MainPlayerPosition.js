import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerByUsername, setPlayers } from '../../../reducers/PlayersReducer';
import { connect } from 'react-redux';
import MainCardList from '../card/MainCardList';
import { popCards } from "../../../reducers/DeckReducer";
import { addCard } from '../../../reducers/PlayersReducer';

const MainPlayerPosition = (props) => {
    const lastCardInDesk = props.deskCards.slice(props.deskCards.length - 1);

    return (
        <Wrapper>
            <Content>
                <MainCardList cards={props.cards} />

                <ButtonWrapper>
                    <ButtonStyle onClick={(e) => props.popCards(lastCardInDesk)}>Draw Card</ButtonStyle>
                    <ButtonStyle>Play Card</ButtonStyle>
                </ButtonWrapper>
            </Content>
        </Wrapper>
    );
};

const mapStateToProps = (state, ownProps) => {
    const player = getPlayerByUsername(state, "test1");
    const deskCards = state.deskReducer.cards;

    return { 
        username : player.username,
        cards: player.cards,
        deskCards: deskCards
    }; 
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPlayers: () => {},
        popCards: (cardName) => {
            dispatch(addCard({ username: "test1", card: cardName}))
            dispatch(popCards());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPlayerPosition);

const Wrapper = styled.div`
  width: 100vw;
  height: 200px;
  background-color: red;

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
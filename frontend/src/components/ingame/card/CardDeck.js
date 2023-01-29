import styled from "styled-components";
import { connect } from "react-redux";
import CardDeskList from "./CardDeskList";
import { popCards } from "../../../reducers/DeckReducer";
import { GameContext } from "../../../context/GameProvider";
import { useContext } from "react";
import CardPrevious from "./CardPrevious";
import CardSTF from "./CardSTF";

const CardDeck = (props) => { 
    const { gameData } = useContext(GameContext);

    return(
        <CardDeskStyle>
            <CardDeskList size={gameData.desk.length}/>
            <CardPrevious />
            <CardSTF />
        </CardDeskStyle> 
    );
};

const mapStateToProps = (state, ownProps) => {
    let cards = state.deskReducer.cards;

    return {
        cards: cards
    }; 
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCards: () => {},
        popCards: () => {dispatch(popCards())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDeck);

const CardDeskStyle = styled.div`
    position: absolute;
    top: 40vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    width: 400px;
    height: 250px;

    display: flex;
    justify-content: center;
    align-items: center;

`
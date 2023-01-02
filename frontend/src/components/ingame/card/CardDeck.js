import styled from "styled-components";
import { connect } from "react-redux";
import CardDeskList from "./CardDeskList";
import { popCards } from "../../../reducers/DeckReducer";

const CardDeck = (props) => { 
    function drawCard() {  };

    function shuffleCard() {   };

    function drawFromBottom() {    };

    function replaceBomb(index) {   }

    function peekThreeCard(){    }

    return(
        <CardDeskStyle>
            <CardDeskList cardSize={props.cards.length}/>
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
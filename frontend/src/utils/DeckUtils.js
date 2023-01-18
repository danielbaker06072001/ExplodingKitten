import { useDispatch } from "react-redux";
import { popCards } from "../reducers/DeckReducer";
import { addCard } from "../reducers/PlayersReducer";
import { getPlayerByUsername } from "../reducers/PlayersReducer";
import {store} from '../'

/*
    Number of cards in game
    Total cards: 56
    -----------------------------
    - See the future: 5 
    - Defuse: 6
    - Nope: 5
    - Skip: 4
    - Exploding kitten: 4
    - Favor : 4
    - Shuffle: 4
    - Attack: 4
    - Special card: 20 (5 types - 4 each)
*/

function generateDeck () { 
    let arr = [];

    arr = arr.concat(generateDeckByAmount("SEE_THE_FUTURE", 5));
    arr = arr.concat(generateDeckByAmount("DEFUSE",6));
    arr = arr.concat(generateDeckByAmount("NOPE",5));
    arr = arr.concat(generateDeckByAmount("SKIP",4));
    arr = arr.concat(generateDeckByAmount("EXPLODING_KITTEN",4));
    arr = arr.concat(generateDeckByAmount("FAVOR",4));
    arr = arr.concat(generateDeckByAmount("SHUFFLE",4));
    arr = arr.concat(generateDeckByAmount("ATTACK",4));

    arr = arr.concat(generateDeckByAmount("SPECIAL_ONE",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_TWO",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_THREE",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_FOUR",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_FIVE",4));

    arr.sort((a,b) => 0.5 - Math.random());
    return arr;
}

function generateDeckByAmount(type, amount) {
    let arr = [];
    for (let i = 0; i < amount; i++) {
        arr.push((type));
    }
    return arr;
}

function dealCardFirstRound(players, deck, dispatch) { 
    for(let i = 0 ; i < 10; i++) { 
        let player = players[i++ % 4];
        const lastCardInDesk = deck.slice(deck.length - 1);
        
        addCardToPlayer(player.username, lastCardInDesk, dispatch);
    }
    return ;
}

function addCardToPlayer(username, cardType, dispatch) { 
    //dispatch(addCard({ username: username, card: cardType}));
    // dispatch(popCards());
    return;
}

export { generateDeck, dealCardFirstRound };
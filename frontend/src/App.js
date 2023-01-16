import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers, setPlayerCards, addCard } from './reducers/PlayersReducer';
import { setDeskCards, popCards } from './reducers/DeckReducer';
import { generateDeck, dealCardFirstRound } from './utils/DeckUtils';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import React from 'react';

function App(props) {
  const dispatch = useDispatch()
  const [playerState, setPlayerState] = useState();
  const [deskState, setDeskState] = useState();

  console.log("Rerender");
  useEffect(()=>{

    dispatch(setDeskCards(generateDeck()));
    
    dispatch(setPlayers(
      [
        {
          username: "duc",
          cards: []
        },
        {
          username: "nhatanh",
          cards: []
        },
        {
          username: "quangloz",
          cards: []
        },
        {
          username: "duongtruc",
          cards: []
        },
      ]
    ));
  },[]);

  
  let players = useSelector((state) => state.playersReducer.players);
  let cards = useSelector((state) => state.deskReducer.cards);

  setPlayerState(players);
  setDeskState(cards);
  
  console.log(players);
  console.log(cards);
  useEffect(() => { 
    for(let i = 0 ; i < 16; i++) { 
      let player = playerState[i % 4];
  
      let lastCardInDesk = deskState.slice(cards.length - 1);
      console.log(playerState, " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    
  
      dispatch(addCard({ username: player.username, card: lastCardInDesk}));
      dispatch(popCards());
    }
  }, []);
  

  return (
      // <RouterProvider router={router} />
      <React.Fragment></React.Fragment>
  );
}

export default App;

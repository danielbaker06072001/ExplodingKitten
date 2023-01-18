import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers, setPlayerCards, addCard } from './reducers/PlayersReducer';
import { setDeskCards, popCards } from './reducers/DeckReducer';
import { generateDeck, dealCardFirstRound } from './utils/DeckUtils';
import { connect } from 'react-redux';
import { useEffect, useState, useLayoutEffect } from 'react';
import React from 'react';
import { socket } from './socket';

// socket.on("loadDeskData", (data) => {
//   const dispatch = useDispatch();

//   const game = JSON.parse(data);
//   dispatch(setDeskCards(game.desk));
//   dispatch(setPlayers(game.players));

//   console.log(game);
// });

function App(props) {
  const dispatch = useDispatch();
  const [loadData, setLoadData] = useState(false);
  // const [dealCard, setDealCard] = useState(false);
  const [gameState, setGameState] = useState({});
  const playerList = useSelector((state) => state.playersReducer.players);
  const cardList = useSelector((state) => state.deskReducer.cards);

  // console.log("Player List App");
  // console.log(playerList);
  
  useEffect(() => { 
      socket.on("loadDeskData", (data) => {
        const game = JSON.parse(data);
        // console.log("GAME: #############", game);
        // console.log("!!!!!!!!!!", game.desk);
        setGameState(game);
        setLoadData(true);
        // dispatch(setDeskCards(game.desk));
        // dispatch(setPlayers(game.players));
      });
  }, []);

  useEffect(() => { 
    console.log(gameState, "INSIDE LOAD DATRA ++++++++++++++++++++")
    dispatch(setDeskCards(gameState.desk));
    dispatch(setPlayers(gameState.players));
}, [loadData]);

  console.log("______________________", gameState);
  
  // useEffect(() => {
  //   setLoadData(true);
  // }, []);

  // useEffect(() => {
  //     if(playerList.length > 0 ) { 
  //       let cardListClone = cardList;

  //       for(let i = 0 ; i < 16; i++) { 
  //         let player = playerList[i % 4];
  //         let lastCardInDesk = cardListClone.slice(cardListClone.length - 1);
  //         cardListClone = cardListClone.slice(0, cardListClone.length - 1);
    
  //         dispatch(addCard({ username: player.username, card: lastCardInDesk}));
  //         dispatch(popCards());
  //       }

  //       setDealCard(true);
  //     }
  // }, [loadData]);

  // if (playerList.length > 0) {
    return (
        <RouterProvider router={router} />
    );
  // }else {
  //   return(
  //     <React.Fragment> </React.Fragment>
  //   );
  // }

}

export default App;

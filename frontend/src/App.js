import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlayers, setUsername } from './reducers/PlayersReducer';
import { setDeskCards} from './reducers/DeckReducer';
import { useEffect, useState } from 'react';
import React from 'react';
import { socket } from './socket';

function App(props) {
  const dispatch = useDispatch();
  const [loadData, setLoadData] = useState(false);
  const [gameState, setGameState] = useState({});

  useEffect(() => { 
      socket.on("loadDeskData", (data) => {
        const game = data;
        setGameState(game);
        setLoadData(true);
      });
  }, []);

  useEffect(() => { 
      dispatch(setDeskCards(gameState.desk));
      dispatch(setPlayers(gameState.players));
      dispatch(setUsername(localStorage.getItem("username")));
  }, [loadData]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;

import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlayers } from './reducers/PlayersReducer';
import { setCards } from './reducers/DeckReducer';

function App() {
  const dispatch = useDispatch()

  dispatch(setPlayers(
    [
      {
        username: "test1",
        cards: ["ATTACK", "DEFUSE", "SKIP", "NOPE","ATTACK"]
      },
      {
        username: "test2",
        cards: ["DEFUSE", "ATTACK", "DEFUSE"]
      },
      {
        username: "test3",
        cards: ["DEFUSE", "ATTACK", "DEFUSE"]
      },
      {
        username: "test4",
        cards: ["DEFUSE", "ATTACK", "DEFUSE"]
      },
    ]
  ));

  let cards = [];
  for (let i = 0; i < 56; i ++) {
    let random = Math.floor(Math.random() * 5);

    if (random === 0) {
      cards.push("ATTACK");
    }
    if (random === 1) {
      cards.push("DEFUSE");
    }
    if (random === 2) {
      cards.push("SKIP");
    }
    if (random === 3) {
      cards.push("NOPE");
    }
    if (random === 4) {
      cards.push("BOMB");
    }
  }
  dispatch(setCards(cards));

  return (
      <RouterProvider router={router} />
  );
}

export default App;


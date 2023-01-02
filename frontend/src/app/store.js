import { configureStore } from '@reduxjs/toolkit'
import playersReducer from '../reducers/PlayersReducer';
import deskReducer from '../reducers/DeckReducer';

const store = configureStore({
  reducer: {
    playersReducer: playersReducer,
    deskReducer: deskReducer
  },
})

export default store;
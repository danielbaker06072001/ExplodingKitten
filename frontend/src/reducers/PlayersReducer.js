import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "@reduxjs/toolkit";


export const PlayersSlice = createSlice({
  name: 'players',
  initialState: {
    players: [],
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setPlayerCards: (state, action) => {
      state.card = action.payload;
    },
    addCard: (state, action) => {
      const player = state.players.find((player) => player.username === action.payload.username);

      player.cards.push(action.payload.card);
    }
  },
});

export const getPlayerByUsername = (state, username) => {
  return state.playersReducer.players.find((player) => player.username === username);
}

// Action creators are generated for each case reducer function
export const { setPlayers, setPlayerCards, addCard } = PlayersSlice.actions;

export default PlayersSlice.reducer;
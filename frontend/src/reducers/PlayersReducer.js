import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

export const PlayersSlice = createSlice({
  name: 'players',
  initialState: {
    username: null,
    roomId: null,
    players: [],
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPlayerCards: (state, action) => {
      state.card = action.payload;
    },
    addCard: (state, action) => {
      const player = state.players.find((player) => player.username === action.payload.username);

      player.cards.push(action.payload.card);
    },
    setRoomOwner: (state, action) => { 
      state.roomOwner = action.payload;
    }
  },
});

export const getPlayerByUsername = (state, username) => {
  return state.playersReducer.players.find((player) => player.username === username);
}

export const getPlayerSession = (state) => {
  let username = state.playersReducer.username;
  return state.playersReducer.players.find((player) => player.username === username);
}

// Action creators are generated for each case reducer function
export const { setPlayers, setPlayerCards, addCard, setUsername, setRoomOwner, setRoomId } = PlayersSlice.actions;

export default PlayersSlice.reducer;
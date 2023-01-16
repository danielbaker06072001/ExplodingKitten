import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "@reduxjs/toolkit";


export const DecksSlice = createSlice({
  name: 'desk',
  initialState: {
    cards: []
  },
  reducers: {
    setDeskCards: (state, action) => {
      state.cards = action.payload;
    },
    popCards: (state, action) => {
      state.cards = state.cards.slice(0, state.cards.length - 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDeskCards, popCards } = DecksSlice.actions;

export default DecksSlice.reducer;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = { 
  items: string[];
};

const initialFavorites = {
  items: [],
} satisfies FavoritesState as FavoritesState;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialFavorites,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      if (state.items.includes(action.payload)) {
        return;
      }

      state.items.push(action.payload);
    },

    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter(id => id !== action.payload);
    },

    clearFavorites(state) {
      state.items = [];
    }
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
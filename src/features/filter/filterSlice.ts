import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  yearRange?: [number, number];
  authors?: string[];
  onlyFavorites?: boolean;
};

const initialFilter = {
  yearRange: undefined,
  authors: undefined,
  onlyFavorites: undefined,
} satisfies FilterState as FilterState;

const favoritesSlice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    clearFilters(state) {
      state.yearRange = undefined;
      state.authors = undefined;
      state.onlyFavorites = undefined;
    },

    setFilter(state, action: PayloadAction<FilterState>) {
      state.yearRange = action.payload.yearRange;
      state.authors = action.payload.authors;
      state.onlyFavorites = action.payload.onlyFavorites;
    },
  },
});

export const { clearFilters, setFilter } = favoritesSlice.actions;
export default favoritesSlice.reducer;
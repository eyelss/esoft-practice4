import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SearchType = string;

export type SearchState = {
  query?: SearchType;
}

const initialSearch = {
  query: undefined,
} satisfies SearchState as SearchState;

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearch,
  reducers: {
    setQuery(state, action: PayloadAction<string | undefined>) {
      state.query = action.payload;
    },

    clearQuery(state) {
      state.query = undefined;
    }
  }
});

export const { setQuery, clearQuery } = searchSlice.actions;
export default searchSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export type ThemeType = 'dark' | 'light';

export type ThemeState = {
  current: ThemeType;
}

const initialTheme = {
  current: localStorage.getItem('theme') as ThemeType ?? 'light'
} satisfies ThemeState as ThemeState;

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialTheme,
  reducers: {
    toggleTheme(state) {
      state.current = state.current === 'dark' ? 'light' : 'dark';
    },
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
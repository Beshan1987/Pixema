import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  value: string;
}

export const initialState: ThemeState = {
  value: 'light'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.value === 'dark' ? (state.value = 'light') : (state.value = 'dark');
    }
  }
});

export const { switchTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;

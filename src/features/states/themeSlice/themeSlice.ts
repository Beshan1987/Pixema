import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppTheme } from './theme.constants';
import { type AppThemes, type ThemeState } from './theme.types';

export const initialState: ThemeState = {
  appearance: AppTheme.light
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<AppThemes>) => {
      state.appearance = action.payload;
    }
  }
});

export const { switchTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;

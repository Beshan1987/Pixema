import { configureStore } from '@reduxjs/toolkit';

import { themeReducer } from './features/States/theme/themeSlice';


export const store = configureStore({
  reducer: {
    themeSwitch: themeReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

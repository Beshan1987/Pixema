import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from './features/states/filterSlice/filterSlice';
import { searchDataReducer } from './features/states/searchData/searchDataSlice';
import { themeReducer } from './features/states/themeSlice/themeSlice';

export const store = configureStore({
  reducer: {
    filterSwitch: filterReducer,
    searchData: searchDataReducer,
    switchTheme: themeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

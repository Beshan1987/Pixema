import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from './features/states/filterSlice/filterSlice';
import { searchDataReducer } from './features/states/searchData/searchDataSlice';

export const store = configureStore({
  reducer: {
    filterSwitch: filterReducer,
    searchData: searchDataReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

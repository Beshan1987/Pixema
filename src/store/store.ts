import { configureStore } from '@reduxjs/toolkit';

import { ListenerMiddleWare } from './store.listener';
import { filterReducer } from '../features/states/filterSlice/filterSlice';
import { themeReducer } from '../features/states/themeSlice/themeSlice';

export const store = configureStore({
  reducer: {
    filterSwitch: filterReducer,
    switchTheme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(ListenerMiddleWare.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

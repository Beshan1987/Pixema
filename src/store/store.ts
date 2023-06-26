import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import { userReducer } from '~/features/states/userSlice/userSlice';

import { ListenerMiddleWare } from './store.listener';
import { filterReducer } from '../features/states/filterSlice/filterSlice';
import { themeReducer } from '../features/states/themeSlice/themeSlice';

export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
  reducer: {
    filterSwitch: filterReducer,
    switchTheme: themeReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(ListenerMiddleWare.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

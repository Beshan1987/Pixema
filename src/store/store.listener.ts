import { createListenerMiddleware } from '@reduxjs/toolkit';

import { switchTheme } from '~/features/states/themeSlice/themeSlice';
import { createTokens } from '~/features/states/userSlice/user.api';
import { userSlice } from '~/features/states/userSlice/userSlice';

export const ListenerMiddleWare = createListenerMiddleware();

ListenerMiddleWare.startListening({
  matcher: switchTheme.match,
  effect: ({ payload }) => {
    document
      .querySelector(':root')!
      .classList[payload === 'dark' ? 'add' : 'remove']('dark');
  }
});

ListenerMiddleWare.startListening({
  matcher: createTokens.fulfilled.match,
  effect: ({ payload }) => {
    localStorage.setItem('@pixema/access-token', payload.access);
    localStorage.setItem('@pixema/refresh-token', payload.refresh);
  }
});

ListenerMiddleWare.startListening({
  matcher: userSlice.actions.logout.match,
  effect: () => {
    localStorage.removeItem('@pixema/access-token');
    localStorage.removeItem('@pixema/refresh-token');
  }
});

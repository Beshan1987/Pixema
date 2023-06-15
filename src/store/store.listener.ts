import { createListenerMiddleware } from '@reduxjs/toolkit';

import { switchTheme } from '~/features/states/themeSlice/themeSlice';

export const ListenerMiddleWare = createListenerMiddleware();

ListenerMiddleWare.startListening({
  matcher: switchTheme.match,
  effect: ({ payload }) => {
    document
      .querySelector(':root')!
      .classList[payload === 'dark' ? 'add' : 'remove']('dark');
  }
});

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { fetchUser } from '~/features/states/userSlice/user.api';
import { MainLayout } from '~/layouts/mainLayout/MainLayout';
import { CertainPage } from '~/pages/CertainPage/CertainPage';
import { EditProfilePage } from '~/pages/EditProfilePage/EditProfilePage';
import { FavoritiesPage } from '~/pages/FavoritiesPage/FavoritiesPage';
import { MainPage } from '~/pages/MainPage/MainPage';
import { SearchResultFilterPage } from '~/pages/SearchResultFilterPage/SearchResultFilterPage';
import { SearchResultPage } from '~/pages/SearchResultPage/SearchResultPage';
import { SettingPage } from '~/pages/SettingPage/SettingPage';
import { SignInPage } from '~/pages/SignInPage/SignIn';
import { SignUpPage } from '~/pages/SignUpPage/SignUp';
import { SuccessFormPage } from '~/pages/SuccessPage/SuccessPage';
import { TrendPage } from '~/pages/TrendPage/TrendPage';
import { type RootState } from '~/store/store';
import { useAppDispatch } from '~/store/store.types';

export const routerSchema = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: '/Trends',
        element: <TrendPage />
      },
      {
        path: '/searchResult/:request',
        element: <SearchResultPage />
      },
      {
        path: '/card/:id',
        element: <CertainPage />
      },
      {
        path: '/Settings',
        element: <SettingPage />
      },
      {
        path: '/Favorities',
        element: <FavoritiesPage />
      },
      {
        path: '/searchResultFilter/:request',
        element: <SearchResultFilterPage />
      },
      {
        path: '/EditProfile',
        element: <EditProfilePage />
      }
    ]
  },
  {
    path: '/signUp',
    element: <SignUpPage />
  },
  {
    path: '/signIn',
    element: <SignInPage />
  },
  {
    path: '/activation/:uid/:token',
    element: <SuccessFormPage />
  },
  {
    path: '*',
    element: <div>not found</div>
  }
]);
export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const tokens = useSelector((state: RootState) =>
    state.user.tokens.status === 'success' ? state.user.tokens.data : null
  );

  useEffect(() => {
    if (tokens) {
      const promise = dispatch(fetchUser());

      return () => {
        promise.abort('cancelled');
      };
    }
  }, [dispatch, tokens]);

  return <RouterProvider router={routerSchema} />;
};

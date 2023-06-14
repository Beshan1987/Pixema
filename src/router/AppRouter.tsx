import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '~/layouts/mainLayout/MainLayout';
import { CertainPage } from '~/pages/CertainPage/CertainPage';
import { MainPage } from '~/pages/MainPage/MainPage';
import { SearchResultPage } from '~/pages/SearchResultPage/SearchResultPage';
import { SettingPage } from '~/pages/SettingPage/SettingPage';
import { TrendPage } from '~/pages/TrendPage/TrendPage';

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
        path: '/searchResult',
        element: <SearchResultPage />
      },
      {
        path: '/card/:id',
        element: <CertainPage />
      },
      {
        path: '/Settings',
        element: <SettingPage />
      }
    ]
  },
  {
    path: '*',
    element: <div>not found</div>
  }
]);
export const AppRouter = () => <RouterProvider router={routerSchema} />;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '~/layouts/mainLayout/MainLayout';
import { MainPage } from '~/pages/MainPage/MainPage';
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
      }
    ]
  },
  {
    path: '*',
    element: <div>not found</div>
  }
]);
export const AppRouter = () => <RouterProvider router={routerSchema} />;

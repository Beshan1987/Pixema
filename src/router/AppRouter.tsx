import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '~/layouts/mainLayout/MainLayout';

import { MainPage } from '~/pages/MainPage/MainPage';


export const routerSchema = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />
      }
    ]
  },
  {
    path: '*',
    element: <div>not found</div>
  }
]);

export const AppRouter = () => <RouterProvider router={routerSchema} />;

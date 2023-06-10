import { Outlet } from 'react-router-dom';

import { Footer } from '~/features/footer/Footer';
import { NavBar } from '~/features/navbar/NavBar';

import LayoutStyle from './MainLayouts.module.scss';

export const MainLayout = () => {
  return (
    <div className={LayoutStyle.container}>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

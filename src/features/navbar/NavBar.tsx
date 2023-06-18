import { Link } from 'react-router-dom';

import { ReactComponent as Pixema } from '~/assets/icons/pixema.svg';
import { Menu } from '~/shared/Menu/Menu';

import styleNavBar from './NavBar.module.scss';
import { SearchBar } from './searchBar/SearchBar';
import { PanelUser } from './userPanel/UserPanel';

export const NavBar = () => {
  return (
    <>
      <div className={styleNavBar.menu}>
        <div className={styleNavBar.menuDesktop}>
          <Menu />
        </div>
      </div>
      <div className={styleNavBar.interactContainer}>
        <div>
          <Link to="/">
            <Pixema />
          </Link>
        </div>
        <SearchBar />
        <PanelUser />
      </div>
    </>
  );
};

import { Link } from 'react-router-dom';

import { ReactComponent as Pixema } from '~/assets/icons/pixema.svg';

import { Menu } from './menu/Menu';
import styleNavBar from './NavBar.module.scss';
import { SearchBar } from './searchBar/SearchBar';
import { PanelUser } from './userPanel/UserPanel';

export const NavBar = () => {
  return (
    <>
      <Menu />
      <div className={styleNavBar.interactContainer}>
        <Link to="/">
          <Pixema />
        </Link>
        <SearchBar />
        <PanelUser />
      </div>
    </>
  );
};

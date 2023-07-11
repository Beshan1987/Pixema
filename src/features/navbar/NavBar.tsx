import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as Pixema } from '~/assets/icons/pixema.svg';
import { Menu } from '~/shared/Menu/Menu';
import { type RootState } from '~/store/store';

import styleNavBar from './NavBar.module.scss';
import { SearchBar } from './searchBar/SearchBar';
import { PanelUser } from './userPanel/UserPanel';

export const NavBar = () => {
  const user = useSelector((state: RootState) =>
    state.user.currentUser.status === 'success'
      ? state.user.currentUser.data
      : null
  );
  return (
    <>
      <div className={styleNavBar.menu}>
        <div className={styleNavBar.menuDesktop}>
          <Menu user={user} />
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

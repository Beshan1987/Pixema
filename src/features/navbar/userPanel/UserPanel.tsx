import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Burger } from '~/assets/icons/burger.svg';
import { ReactComponent as ChevronDown } from '~/assets/icons/chevronDown.svg';
import { ReactComponent as ChevronRight } from '~/assets/icons/chevronRight.svg';
import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { ReactComponent as IconUser } from '~/assets/icons/IconUser.svg';
import { useOutsideClick } from '~/features/CustomHooks/ClickOutSide';
import { actions } from '~/features/states/userSlice/userSlice';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Menu } from '~/shared/Menu/Menu';
import { MenuStyleAppearance } from '~/shared/Menu/Menu.types';
import { type RootState } from '~/store/store';
import { useAppDispatch } from '~/store/store.types';

import { UserActionBar } from './UserActionBar/UserActionBar';
import stylePanelUser from './UserPanel.module.scss';
import { UserInitials } from './UserPanelInitials';

export const PanelUser = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isOpenUserActionBar, setIsOpenUserActionBar] = useState(true);

  const user = useSelector((state: RootState) =>
    state.user.currentUser.status === 'success'
      ? state.user.currentUser.data
      : null
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const toggleBurger = () => {
    setIsOpenMenu((hasBeenOpened) => !hasBeenOpened);
  };

  const reference = useOutsideClick(() => {
    isOpenMenu ? null : toggleBurger();
  });

  const referenceUser = useOutsideClick(() => {
    isOpenUserActionBar ? null : toggleUserBar();
  });

  const toggleUserBar = () => {
    setIsOpenUserActionBar((hasBeenOpened) => !hasBeenOpened);
  };

  return user ? (
    <>
      <div className={stylePanelUser.container}>
        <UserInitials />
        <div className={stylePanelUser.userNameWrapper}>{user.username}</div>
        <Button
          icon={isOpenUserActionBar ? <ChevronRight /> : <ChevronDown />}
          appearance={ButtonStyleAppearance.chevron}
          onClick={toggleUserBar}
        ></Button>
      </div>
      <div className={stylePanelUser.burger}>
        <Button
          onClick={toggleBurger}
          icon={isOpenMenu ? <Burger /> : <IconCancel />}
          appearance={ButtonStyleAppearance.burger}
        ></Button>
      </div>
      <Menu
        appearance={MenuStyleAppearance.tablet}
        isOpen={isOpenMenu}
        makeOpen={toggleBurger}
        user={user}
        onLogOut={() => dispatch(actions.logout())}
        reference={reference}
      />
      <UserActionBar
        isOpen={isOpenUserActionBar}
        referenUser={referenceUser}
      />
    </>
  ) : (
    <>
      <div className={stylePanelUser.container}>
        <div onClick={() => navigate('/signIn')}>
          <IconUser />
        </div>

        <Button
          icon={isOpenUserActionBar ? <ChevronRight /> : <ChevronDown />}
          appearance={ButtonStyleAppearance.chevron}
          onClick={toggleUserBar}
        ></Button>
      </div>
      <div className={stylePanelUser.burger}>
        <Button
          onClick={toggleBurger}
          icon={isOpenMenu ? <Burger /> : <IconCancel />}
          appearance={ButtonStyleAppearance.burger}
        ></Button>
      </div>
      <Menu
        appearance={MenuStyleAppearance.tablet}
        isOpen={isOpenMenu}
        makeOpen={toggleBurger}
        user={user}
        reference={reference}
      />
      <UserActionBar
        isOpen={isOpenUserActionBar}
        referenUser={referenceUser}
      />
    </>
  );
};

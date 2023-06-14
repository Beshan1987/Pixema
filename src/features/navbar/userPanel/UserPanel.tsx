import { useState } from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as Burger } from '~/assets/icons/burger.svg';
import { ReactComponent as ChevronDown } from '~/assets/icons/chevronDown.svg';
import { ReactComponent as ChevronRight } from '~/assets/icons/chevronRight.svg';
import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { ReactComponent as IconUser } from '~/assets/icons/IconUser.svg';
import { type User } from '~/entities/User';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Menu } from '~/shared/Menu/Menu';
import { MenuStyleAppearance } from '~/shared/Menu/Menu.types';

import { UserActionBar } from './UserActionBar/UserActionBar';
import { UserAction } from './UserPanel.constant';
import stylePanelUser from './UserPanel.module.scss';
import { UserName } from './UserPanelInitials';

const user: User = {
  username: 'Beshan Andrey',
  email: 'dqqq@gmail.com',
  id: 11
};

export const PanelUser = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isOpenUserActionBar, setIsOpenUserActionBar] = useState(true);

  const toggleBurger = () => {
    setIsOpenMenu((hasBeenOpened) => !hasBeenOpened);
  };

  const toggleUserBar = () => {
    setIsOpenUserActionBar((hasBeenOpened) => !hasBeenOpened);
  };

  return user ? (
    <>
      <div className={stylePanelUser.container}>
        <UserName />
        <div>{user.username}</div>
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
      />
      <UserActionBar isOpen={isOpenUserActionBar} />
    </>
  ) : (
    <Link to="{/sign-in}">
      <Button
        icon={<IconUser />}
        text={UserAction['sign in']}
        appearance={ButtonStyleAppearance.user}
      />
    </Link>
  );
};

import { useState } from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as Burger } from '~/assets/icons/burger.svg';
import { ReactComponent as ChevronRight } from '~/assets/icons/chevronRight.svg';
import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { ReactComponent as IconUser } from '~/assets/icons/IconUser.svg';
import { type User } from '~/entities/User';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Menu } from '~/shared/Menu/Menu';
import { MenuStyleAppearance } from '~/shared/Menu/Menu.types';

import stylePanelUser from './UserPanel.module.scss';
import { UserName } from './UserPanelInitials';

const user: User = {
  username: 'Beshan Andrey',
  email: 'dqqq@gmail.com',
  id: 11
};

export const PanelUser = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleBurger = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };
  return user ? (
    <>
      <div className={stylePanelUser.container}>
        <UserName />
        <div>{user.username}</div>
        <Button
          icon={<ChevronRight />}
          appearance={ButtonStyleAppearance.chevron}
        ></Button>
      </div>
      <div className={stylePanelUser.burger}>
        <Button
          onClick={toggleBurger}
          icon={isOpen ? <Burger /> : <IconCancel />}
          appearance={ButtonStyleAppearance.burger}
        ></Button>
      </div>
      <div
        data-open={isOpen}
        className={stylePanelUser.menu}
      >
        <Menu appearance={MenuStyleAppearance.tablet} />
      </div>
    </>
  ) : (
    <Link to="/sign-in">
      <Button
        icon={<IconUser />}
        text="Sign ip"
        appearance={ButtonStyleAppearance.user}
      />
    </Link>
  );
};

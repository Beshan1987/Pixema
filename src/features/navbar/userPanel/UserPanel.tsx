import { Link } from 'react-router-dom';

import { ReactComponent as IconUser } from '~/assets/icons/IconUser.svg';
import { type User } from '~/entities/User';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import stylePanelUser from './UserPanel.module.scss';
import { UserName } from './UserPanelInitials';

const user: User = {
  username: 'Beshan Andrey',
  email: 'dqqq@gmail.com',
  id: 11
};

export const PanelUser = () => {
  return user ? (
    <div className={stylePanelUser.container}>
      <UserName />
      <div>{user.username}</div>
    </div>
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

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { type RootState } from '~/store/store';

import styleUserActionBar from './UserAction.module.scss';
import { UserAction } from '../UserPanel.constant';

export const UserActionBar = ({ isOpen }: { isOpen: boolean }) => {
  const user = useSelector((state: RootState) =>
    state.user.currentUser.status === 'success'
      ? state.user.currentUser.data
      : null
  );

  return user ? (
    <div
      className={styleUserActionBar.container}
      data-open={isOpen}
    >
      <Link to="/edit ptofile">{UserAction['Edit profile']}</Link>

      <Link to="/">{UserAction['log out']}</Link>
    </div>
  ) : (
    <div
      className={styleUserActionBar.container}
      data-open={isOpen}
    >
      <Link to="/signIn">{UserAction['sign in']}</Link>

      <Link to="/signUp">{UserAction['sign up']}</Link>
    </div>
  );
};

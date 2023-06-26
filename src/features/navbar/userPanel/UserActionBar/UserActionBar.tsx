import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { actions } from '~/features/states/userSlice/userSlice';
import { Button } from '~/shared/Button/Button';
import { type RootState } from '~/store/store';
import { useAppDispatch } from '~/store/store.types';

import styleUserActionBar from './UserAction.module.scss';
import { UserAction } from '../UserPanel.constant';

export const UserActionBar = ({ isOpen }: { isOpen: boolean }) => {
  const user = useSelector((state: RootState) =>
    state.user.currentUser.status === 'success'
      ? state.user.currentUser.data
      : null
  );
  const dispatch = useAppDispatch();

  return user ? (
    <div
      className={styleUserActionBar.container}
      data-open={isOpen}
    >
      <Link to="/edit ptofile">{UserAction['Edit profile']}</Link>

      <Button
        text={UserAction['log out']}
        onClick={() => dispatch(actions.logout())}
      >
        {' '}
      </Button>
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

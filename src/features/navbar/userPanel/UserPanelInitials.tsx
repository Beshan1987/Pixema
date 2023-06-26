import { useSelector } from 'react-redux';

import { type RootState } from '~/store/store';

export const UserInitials = () => {
  const user = useSelector((state: RootState) =>
    state.user.currentUser.status === 'success'
      ? state.user.currentUser.data
      : null
  );
  return <div>{user ? user.username.slice(0, 1).toUpperCase() : null}</div>;
};

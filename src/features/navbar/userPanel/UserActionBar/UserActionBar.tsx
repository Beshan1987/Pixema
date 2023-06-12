import { Link } from 'react-router-dom';

import styleUserActionBar from './UserAction.module.scss';
import { UserAction } from '../UserPanel.constant';

export const UserActionBar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={styleUserActionBar.container}
      data-open={isOpen}
    >
      <Link to="/edit ptofile">{UserAction['Edit profile']}</Link>

      <Link to="/">{UserAction['log out']}</Link>
    </div>
  );
};

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as IconFave } from '~/assets/icons/IconFave.svg';
import { ReactComponent as IconHome } from '~/assets/icons/IconHome.svg';
import { ReactComponent as IconSettings } from '~/assets/icons/IconSettings.svg';
import { ReactComponent as IconTrend } from '~/assets/icons/IconTrend.svg';
import { NavLinks } from '~/features/navbar/navbar.constants';

import menuStyle from './Menu.module.scss';
import { MenuStyleAppearance } from './Menu.types';

export const Menu = ({
  appearance = MenuStyleAppearance.desktop,
  isOpen,
  makeOpen
}: {
  appearance?: MenuStyleAppearance;
  isOpen?: boolean;
  makeOpen?: () => void;
}) => {
  return (
    <div
      data-open={isOpen}
      className={classNames({
        [menuStyle.desktop]: true,
        [menuStyle[appearance]]: true
      })}
    >
      {NavLinks.map((link) => (
        <NavLink
          className={({ isActive }) => (isActive ? `${menuStyle.active}` : '')}
          to={link.path}
          key={link.path}
          onClick={makeOpen}
        >
          {link.title === 'Home' ? (
            <IconHome />
          ) : link.title === 'Trends' ? (
            <IconTrend />
          ) : link.title === 'Favorities' ? (
            <IconFave />
          ) : link.title === 'Settings' ? (
            <IconSettings />
          ) : null}
          {link.title}
        </NavLink>
      ))}
    </div>
  );
};

import { NavLink } from 'react-router-dom';
import { NavLinks } from '~/features/navbar/navbar.constants';
import {ReactComponent as Pixema} from '~/assets/icons/pixema.svg'
import {ReactComponent as IconHome} from '~/assets/icons/IconHome.svg'
import {ReactComponent as IconTrend} from '~/assets/icons/IconTrend.svg'
import {ReactComponent as IconFave} from '~/assets/icons/IconFave.svg';
import {ReactComponent as IconSettings} from '~/assets/icons/IconSettings.svg'


import menuStyle from './Menu.module.scss';



export const Menu = () => {
  
  return (
    <div
      className={menuStyle.container}
    >

      <NavLink
     className={({ isActive }) =>
                    isActive ? `${menuStyle.active}` : ''
                  }
                  to='/'
                >
            <Pixema/>
                </NavLink>
        
          {NavLinks.map((link) => (
            <div>
                
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${menuStyle.active}` : ''
                  }
                  to={link.path}
                  key={link.path}
                >
                    {
                link.title === 'Home'? <IconHome/>: 
                link.title === 'Trends'? <IconTrend/>:
                link.title === 'Favorities'? <IconFave/>:
                link.title === 'Settings'? <IconSettings/>:null
                }
                  {' '}
                  {link.title}
                </NavLink>
                </div>
              ))}
        </div>
  );
};

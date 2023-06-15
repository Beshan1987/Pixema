import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconSwitchOff } from '~/assets/icons/iconSwitchOff.svg';
import { ReactComponent as IconSwitchOn } from '~/assets/icons/iconSwitchOn.svg';
import { AppTheme } from '~/features/states/themeSlice/theme.constants';
import { switchTheme } from '~/features/states/themeSlice/themeSlice';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { type RootState } from '~/store/store';

import styleSettingPage from './SettingPage.module.scss';

export const SettingPage = () => {
  const theme = useSelector((state: RootState) => state.switchTheme.appearance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styleSettingPage.container}>
      <h2>Color mode</h2>
      <div className={styleSettingPage.darkModeContainer}>
        <div className={styleSettingPage.darkMode}>
          <span>Dark</span>
          <span>Use dark thema</span>
        </div>
        <div className={styleSettingPage.switcher}>
          <Button
            icon={
              theme === AppTheme.dark ? <IconSwitchOff /> : <IconSwitchOn />
            }
            onClick={() => {
              theme === AppTheme.dark
                ? dispatch(switchTheme(AppTheme.light))
                : dispatch(switchTheme(AppTheme.dark));
            }}
          ></Button>
        </div>
      </div>
      <Button
        text={'back to home'}
        appearance={ButtonStyleAppearance.system}
        onClick={() => navigate('/')}
      ></Button>
    </div>
  );
};

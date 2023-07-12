import { useState } from 'react';

import { Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={styleSettingPage.container}>
      <h2>Color mode</h2>
      <div className={styleSettingPage.darkModeContainer}>
        <div className={styleSettingPage.darkMode}>
          <span>Dark</span>
          <span>Use dark thema</span>
        </div>
        <div className={styleSettingPage.switcher}>
          <Switch
            checked={isChecked}
            onChange={handleChange}
            color="secondary"
            onClick={() => {
              theme === AppTheme.dark
                ? dispatch(switchTheme(AppTheme.light))
                : dispatch(switchTheme(AppTheme.dark));
            }}
          />
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

import { type ButtonHTMLAttributes, type ReactElement } from 'react';

import classNames from 'classnames';

import {
  ButtonStyleAppearance,
  type ButtonStyleAppearances
} from '~/shared/Button/Button.types';

import buttonStyle from './Button.module.scss';

export const Button = ({
  text = null,
  appearance = ButtonStyleAppearance.button,
  icon = null,
  iconRight = null,
  ...passThroughProperties
}: {
  text?: string | null;
  appearance?: ButtonStyleAppearances;
  icon?: ReactElement | null;
  iconRight?: ReactElement | null;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...passThroughProperties}
      className={classNames({
        [buttonStyle.button]: true,
        [buttonStyle[appearance]]: true
      })}
    >
      {icon && <div className={buttonStyle.icon}>{icon}</div>}
      {text}
      {iconRight && <div className={buttonStyle.icon}>{iconRight}</div>}
    </button>
  );
};

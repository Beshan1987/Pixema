import { type InputHTMLAttributes } from 'react';

import inputStyle from './Input.module.scss';

export const Input = ({
  id,
  label,
  error,
  ...inputProperties
}: {
  error?: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={inputStyle.container}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        data-valid={!error}
        {...inputProperties}
      />
      {error && <div className={inputStyle.error}>{error}</div>}
    </div>
  );
};

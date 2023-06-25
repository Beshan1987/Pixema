import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { createTokens } from '~/features/states/userSlice/user.api';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Input } from '~/shared/inputForm/Input';
import { type RootState } from '~/store/store';
import { useAppDispatch } from '~/store/store.types';

import formStyles from './SignInForm.module.scss';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state: RootState) =>
    state.user.currentUser.status === 'success'
      ? state.user.currentUser.data
      : null
  );
  const dispatch = useAppDispatch();

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <form
      className={formStyles.container}
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(createTokens({ email, password }))
          .then((data) => data)
          .catch((error: Error) => error);
      }}
    >
      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        id="email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        id="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <Button
        type="submit"
        appearance={ButtonStyleAppearance.system}
        text="Sign In"
      >
        Log in
      </Button>
    </form>
  );
};

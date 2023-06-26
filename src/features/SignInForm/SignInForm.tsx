import { useCallback, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { createTokens } from '~/features/states/userSlice/user.api';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Input } from '~/shared/inputForm/Input';
import { type RootState } from '~/store/store';
import { useAppDispatch } from '~/store/store.types';

import { type FormState } from './form.types';
import { getDefaultFormValues, getFormErrors } from './form.utils';
import formStyles from './SignInForm.module.scss';

export const SignInForm = () => {
  const [formState, setFormState] = useState<FormState>(getDefaultFormValues);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state: RootState) =>
    state.user.currentUser.status === 'success'
      ? state.user.currentUser.data
      : null
  );
  const dispatch = useAppDispatch();

  const updateFormValues = useCallback((newFormValue: Partial<FormState>) => {
    setFormState((previousFields) => ({ ...previousFields, ...newFormValue }));
    setTouchedFields(
      (previousFields) =>
        new Set([...previousFields.values(), ...Object.keys(newFormValue)])
    );
  }, []);

  const formErrors = useMemo(() => getFormErrors(formState), [formState]);

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <div className={formStyles.container}>
      <h2>Sign In</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setIsLoading(true);
          dispatch(createTokens(formState))
            .then(() => setIsLoading(true))
            .catch((error) => {
              setErrorMessage((error as Error).message);
              setIsLoading(false);
            });
        }}
      >
        {errorMessage ? <div>{errorMessage}</div> : null}
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          id="email"
          error={touchedFields.has('email') ? formErrors['email'] : undefined}
          value={formState.email}
          onChange={({ target: { value } }) =>
            updateFormValues({ email: value })
          }
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          id="password"
          error={
            touchedFields.has('password') ? formErrors['password'] : undefined
          }
          value={formState.password}
          onChange={({ target: { value } }) =>
            updateFormValues({ password: value })
          }
        />
        <div className={formStyles.BtnWrap}>
          <Button
            disabled={
              isLoading ||
              touchedFields.size === 0 ||
              Object.keys(formErrors).length > 0 ||
              !!user
            }
            type="submit"
            appearance={ButtonStyleAppearance.system}
            text="Sign In"
          >
            Log in
          </Button>
        </div>
      </form>
      <div>
        <span>Don’t have an account?</span>
        <Link to="/signUp">Sign UP</Link>
      </div>
    </div>
  );
};

import { useCallback, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import { createUser, type CreateUserResponse } from '~/api/createUser';
import { formSchema } from '~/features/SignUpForm/form.schema';
import { type FormState } from '~/features/SignUpForm/form.types';
import {
  getDefaultFormValues,
  getFormErrors
} from '~/features/SignUpForm/form.utils';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Input } from '~/shared/inputForm/Input';

import formStyles from './SignUpForm.module.scss';

export const SignUpForm = ({
  onCreateUser
}: {
  onCreateUser: (user: CreateUserResponse) => void;
}) => {
  const [formState, setFormState] = useState<FormState>(getDefaultFormValues);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormValues = useCallback((newFormValue: Partial<FormState>) => {
    setFormState((previousFields) => ({ ...previousFields, ...newFormValue }));
    setTouchedFields(
      (previousFields) =>
        new Set([...previousFields.values(), ...Object.keys(newFormValue)])
    );
  }, []);

  const formErrors = useMemo(() => getFormErrors(formState), [formState]);

  return (
    <div className={formStyles.container}>
      <h2>Sign Up</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const { ...user } = formState;

          setIsLoading(true);

          createUser(user)
            .then((data) => {
              setIsLoading(false);
              onCreateUser(data);
            })
            .catch((error) => {
              setIsLoading(false);
              setErrorMessage((error as Error).message);
            });
        }}
      >
        {errorMessage ? <div>{errorMessage}</div> : null}
        {formSchema.map((field) => (
          <Input
            {...field}
            key={field.name}
            value={formState[field.name]}
            error={
              touchedFields.has(field.name) ? formErrors[field.name] : undefined
            }
            onChange={({ target: { value } }) =>
              updateFormValues({ [field.name]: value })
            }
          />
        ))}
        <div className={formStyles.BtnWrap}>
          <Button
            type="submit"
            appearance={ButtonStyleAppearance.system}
            text="Sign Up"
            disabled={
              isLoading ||
              touchedFields.size === 0 ||
              Object.keys(formErrors).length > 0
            }
          ></Button>
        </div>
      </form>
      <div>
        <span>Already have an account?</span>
        <Link to="/signIn"> Sign In</Link>
      </div>
    </div>
  );
};

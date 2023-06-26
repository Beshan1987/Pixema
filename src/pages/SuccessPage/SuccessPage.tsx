import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { type ActivateEmailPayload, activateEmail } from '~/api/activateEmail';
import { SuccessForm } from '~/features/SuccessForm/SuccessForm';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleSuccessForm from './Success.module.scss';

export const SuccessFormPage = () => {
  const tokens = useParams<'uid' | 'token'>();
  const [errorMessage, setErrorMessage] = useState('');
  const [activationState, setActivationState] = useState<
    'loading' | 'success' | 'error'
  >('loading');

  useEffect(() => {
    activateEmail(tokens as ActivateEmailPayload)
      .then(() => {
        setActivationState('success');
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setActivationState('error');
      });
  }, [tokens]);
  if (activationState === 'error') {
    return (
      <div className={styleSuccessForm.container}>
        <div className={styleSuccessForm.error}>
          <h2>{errorMessage}</h2>
          <Link to="/">
            <Button
              text="Back to home"
              appearance={ButtonStyleAppearance.system}
            ></Button>
          </Link>
        </div>
      </div>
    );
  }
  if (activationState === 'success') {
    return (
      <div className={styleSuccessForm.container}>
        <SuccessForm />
      </div>
    );
  }

  if (activationState === 'loading') {
    return (
      <div className={styleSuccessForm.container}>
        <h2>loading</h2>
      </div>
    );
  }
  return <div>God knows what is going on here</div>;
};

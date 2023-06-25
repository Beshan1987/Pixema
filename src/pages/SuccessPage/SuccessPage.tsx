import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { type ActivateEmailPayload, activateEmail } from '~/api/activateEmail';
import { SuccessForm } from '~/features/SuccessForm/SuccessForm';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

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
      <div>
        <h2>{errorMessage}</h2>
        <Link to="/">
          <Button
            text="Back to home"
            appearance={ButtonStyleAppearance.system}
          ></Button>
        </Link>
      </div>
    );
  }
  if (activationState === 'success') {
    return (
      <div>
        <Link to="/">
          <Button
            text="Back to home"
            appearance={ButtonStyleAppearance.system}
          ></Button>
        </Link>
        <h2>Success</h2>
        <SuccessForm />
      </div>
    );
  }

  if (activationState === 'loading') {
    return <h2>loading</h2>;
  }
  return <div>God knows what is going on here</div>;
};

import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { type CreateUserResponse } from '~/api/createUser';
import { ReactComponent as IconPixema } from '~/assets/icons/pixema.svg';
import { SignUpForm } from '~/features/SignUpForm/SignUpForm';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleSignUp from './SignUp.module.scss';

export const SignUpPage = () => {
  const [createdUser, setCreatedUser] = useState<CreateUserResponse | null>(
    null
  );
  const navigate = useNavigate();

  return (
    <>
      <div className={styleSignUp.svg}>
        <Link to="/">
          <IconPixema />
        </Link>
      </div>
      <div className={styleSignUp.container}>
        {createdUser ? (
          <div className={styleSignUp.wrapperConfirmation}>
            <h2>Registration Confirmation</h2>
            <p>{`Please activate your account with the activation
link in the email ${createdUser.email}. Please, check your email`}</p>
            <Button
              onClick={() => navigate('/')}
              appearance={ButtonStyleAppearance.system}
              text="home"
            ></Button>
          </div>
        ) : (
          <>
            <SignUpForm onCreateUser={(newUser) => setCreatedUser(newUser)} />
          </>
        )}
      </div>
    </>
  );
};

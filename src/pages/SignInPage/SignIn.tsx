import { ReactComponent as IconPixema } from '~/assets/icons/pixema.svg';
import { SignInForm } from '~/features/SignInForm/SignInForm';

import styleSignIn from './SignIp.module.scss';

export const SignInPage = () => {
  return (
    <>
      <div className={styleSignIn.svg}>
        <IconPixema />
      </div>
      <div className={styleSignIn.container}>
        <SignInForm />
      </div>
    </>
  );
};

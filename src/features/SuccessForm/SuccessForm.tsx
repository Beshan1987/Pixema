import { Link } from 'react-router-dom';

import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleSuccess from './Success.module.scss';

export const SuccessForm = () => {
  return (
    <div className={styleSuccess.container}>
      <span>
        Email confirmed.
        <br></br>
        Your registration is now completed
      </span>
      <Link to="/">
        <Button
          text="Go to home"
          appearance={ButtonStyleAppearance.system}
        ></Button>
      </Link>
    </div>
  );
};

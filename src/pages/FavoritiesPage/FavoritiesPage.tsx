import { ReactComponent as IconFaveEmpty } from '~/assets/icons/FaveEmptyList.svg';

import styleFavePage from './FavoritePage.module.scss';

export const FavoritiesPage = () => {
  return (
    <div className={styleFavePage.container}>
      <IconFaveEmpty />
      <h2>Nothing added here</h2>
    </div>
  );
};

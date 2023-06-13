import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconIMDB } from '~/assets/icons/IconIMDB.svg';
import { type CardAPI } from '~/entities/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleCard from './CertainCard.module.scss';

export const CertainCard = ({ card }: { card: CardAPI }) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        text="Go back"
        appearance={ButtonStyleAppearance.pagination}
      ></Button>
      <div className={styleCard.wrapper}>
        <div className={styleCard.containerImg}>
          <div>
            <img src={card.Poster}></img>
          </div>
        </div>
        <div className={styleCard.containerDiscription}>
          <span>{card.Genre.split(',').join(' -')}</span>
          <h1>{card.Title}</h1>
          <div className={styleCard.rating}>
            <div>Votes {card.imdbVotes}</div>
            <div>
              <IconIMDB /> {card.imdbRating}
            </div>
            <div>{card.Runtime}</div>
          </div>
          <p>{card.Plot}</p>
        </div>
      </div>
    </>
  );
};

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
          <div>
            <div className={styleCard.shorts}>
              <div>
                <span>Year</span>
                <span>{card.Year}</span>
              </div>
              <div>
                <span>Released</span>
                <span>{card.Released}</span>
              </div>
              <div>
                <span>BoxOffice</span>
                <span>{card.BoxOffice}</span>
              </div>
              <div>
                <span>Country</span>
                <span>{card.Country}</span>
              </div>
              <div>
                <span>Production</span>
                <span>{card.Production}</span>
              </div>
              <div>
                <span>Actors</span>
                <span>{card.Actors}</span>
              </div>
              <div>
                <span>Director</span>
                <span>{card.Director}</span>
              </div>
              <div>
                <span>Writers</span>
                <span>{card.Writer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

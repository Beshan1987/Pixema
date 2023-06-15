import { Link } from 'react-router-dom';

import { type SearchCard } from '~/entities/Card';

import styleCard from './Card.module.scss';

export const Card = ({ card }: { card: SearchCard[] }) => {
  return (
    <div className={styleCard.wrapper}>
      {card.map((card) => (
        <>
          {card.Poster === 'N/A' ? null : (
            <div
              className={styleCard.container}
              key={card.imdbID}
            >
              <Link to={`/card/${card.imdbID}`}>
                <div>
                  <img src={card.Poster}></img>
                </div>
              </Link>
              <Link to={`/card/${card.imdbID}`}>
                <div>{card.Title}</div>
              </Link>
              <div className={styleCard.description}>
                {card.Year} / {card.Type}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

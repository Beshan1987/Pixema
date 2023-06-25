import { Link } from 'react-router-dom';

import { type CardAPI } from '~/entities/Card';

function getRatingLevel(rate: number) {
  if (rate > 8) {
    return 'high';
  }
  return rate < 4 ? 'superlow' : 'low';
}

import styleCard from './Card.module.scss';

export const Card = ({ card }: { card: CardAPI[] }) => {
  return (
    <div className={styleCard.wrapper}>
      {card.map((card) => (
        <>
          {card.poster && (
            <div
              className={styleCard.container}
              key={card.id}
            >
              {getRatingLevel(card.rating.imdb) === 'low' && (
                <span className={styleCard.rateLow}>{card.rating.imdb}</span>
              )}
              {getRatingLevel(card.rating.imdb) === 'high' && (
                <span className={styleCard.rateHigh}>{card.rating.imdb}</span>
              )}
              {getRatingLevel(card.rating.imdb) === 'superlow' && (
                <span className={styleCard.rateSuperlow}>
                  {card.rating.imdb}
                </span>
              )}
              <Link to={`/card/${card.id}`}>
                <div>
                  <img src={card.poster.url}></img>
                </div>
              </Link>
              <Link to={`/card/${card.id}`}>
                {card.alternativeName && <div>{card.alternativeName}</div>}
                {card.name && <div>{card.name}</div>}
              </Link>
              <div className={styleCard.description}>
                {card.year}
                <div>{card.type}</div>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

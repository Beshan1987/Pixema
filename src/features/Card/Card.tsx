import { Link } from 'react-router-dom';

import { ReactComponent as TrendIcon } from '~/assets/icons/Trends.svg';
import { type CardAPI } from '~/entities/Card';

import styleCard from './Card.module.scss';
import { getRatingLevel, isTrend } from './Card.utils';

export const Card = ({ card }: { card: CardAPI[] }) => {
  return (
    <div className={styleCard.wrapper}>
      {card.map((card) => (
        <>
          <div
            className={styleCard.container}
            key={card.id}
          >
            {getRatingLevel(card.rating.imdb) === 'low' && (
              <span className={styleCard.rateLow}>{card.rating.imdb}</span>
            )}
            {getRatingLevel(card.rating.imdb) === 'high' && (
              // <span className={styleCard.rateHigh}>{card.rating.imdb}</span>
              <span
                className={
                  isTrend({
                    year: card.year,
                    audienceCount: card.audience[0].count
                  })
                    ? styleCard.rateHighTrend
                    : styleCard.rateHigh
                }
              >
                {card.rating.imdb}
                {isTrend({
                  year: card.year,
                  audienceCount: card.audience[0].count
                }) && <TrendIcon />}
              </span>
            )}
            {getRatingLevel(card.rating.imdb) === 'superlow' && (
              <span className={styleCard.rateSuperlow}>{card.rating.imdb}</span>
            )}
            <Link
              to={`/card/${card.id}`}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
              }}
            >
              <div>
                {card.poster ? (
                  <img src={card.poster.url}></img>
                ) : (
                  <img src="/src/assets/BG/NoPoster.jpeg"></img>
                )}
              </div>
            </Link>
            <Link
              to={`/card/${card.id}`}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
              }}
            >
              {card.alternativeName && <div>{card.alternativeName}</div>}
              {card.name && <div>{card.name}</div>}
            </Link>
            <div className={styleCard.description}>
              {card.year}
              <div>{card.type}</div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

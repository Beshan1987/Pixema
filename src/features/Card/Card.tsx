import { Link } from 'react-router-dom';

import { type SearchCard } from '~/entities/Card';

import styleCard from './Card.module.scss';

export const Card = ({ card }: { card: SearchCard[] }) => {
  return (
    <div className={styleCard.wrapper}>
      {card.map((card) => (
        <div
          className={styleCard.container}
          key={card.imdbID}
        >
          <div>
            <img src={card.Poster}></img>
          </div>
          <Link to={`/card/${card.imdbID}`}>
            <div>{card.Title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

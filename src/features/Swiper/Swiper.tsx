import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { type Persons, type CardAPI } from '~/entities/Card';

import styleSwiper from './Swiper.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const SwiperCard = ({
  card,
  actor
}: {
  card?: CardAPI;
  actor?: Persons[];
}) => {
  if (card)
    return (
      <Swiper
        className={styleSwiper.swiper}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        pagination={card.similarMovies.length > 3 && { clickable: true }}
        navigation
        scrollbar={card.similarMovies.length > 3 && { draggable: true }}
      >
        {card.similarMovies.map((card) => (
          <SwiperSlide
            className={styleSwiper.container}
            key={card.id}
          >
            {card.poster && (
              <div key={card.id}>
                <Link to={`/card/${card.id}`}>
                  <div key={card.id}>
                    <img
                      src={card.poster.url}
                      key={card.poster.url}
                    ></img>
                  </div>
                </Link>
                <Link to={`/card/${card.id}`}>
                  {card.alternativeName && <div>{card.alternativeName}</div>}
                  {card.name && <div>{card.name}</div>}
                </Link>
                <div key={card.type}>{card.type}</div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  return actor ? (
    <Swiper
      className={styleSwiper.swiper}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={5}
      pagination={actor.length > 3 && { clickable: true }}
      navigation
      scrollbar={actor.length > 3 && { draggable: true }}
    >
      {actor
        .filter((actor) => actor.enProfession === 'actor')
        .map((actor) => (
          <SwiperSlide
            className={classNames({
              [styleSwiper.container]: true,
              [styleSwiper.containerActors]: true
            })}
            key={actor.id}
          >
            <div key={actor.id}>
              <Link to={`/actor/${actor.id}`}>
                <div key={actor.id}>
                  <img
                    src={actor.photo}
                    key={actor.photo}
                  ></img>
                </div>
              </Link>
              <Link to={`/actor/${actor.id}`}>
                {actor.enName && <p>{actor.enName} </p>}
                {!actor.enName && <p>{actor.name} </p>}
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  ) : null;
};

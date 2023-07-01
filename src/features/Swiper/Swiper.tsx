import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { type CardAPI } from '~/entities/Card';

import styleSwiper from './Swiper.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const SwiperCard = ({ card }: { card: CardAPI }) => {
  return (
    <Swiper
      className={styleSwiper.swiper}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      scrollbar={{ draggable: true }}
    >
      {card.similarMovies.map((card) => (
        <SwiperSlide
          className={styleSwiper.container}
          key={card.id}
        >
          {card.poster && (
            <div key={card.id}>
              <Link to={`/card/${card.id}`}>
                <div>
                  <img src={card.poster.url}></img>
                </div>
              </Link>
              <Link to={`/card/${card.id}`}>
                {card.alternativeName && <div>{card.alternativeName}</div>}
                {card.name && <div>{card.name}</div>}
              </Link>
              <div>{card.type}</div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

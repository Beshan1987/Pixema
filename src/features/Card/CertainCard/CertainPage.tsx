import { createRef, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconDown } from '~/assets/icons/chevronDown.svg';
import { ReactComponent as IconIMDB } from '~/assets/icons/IconIMDB.svg';
import { type CardAPI } from '~/entities/Card';
import { SwiperCard } from '~/features/Swiper/Swiper';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleCard from './CertainCard.module.scss';

export const CertainCard = ({ card }: { card: CardAPI }) => {
  const navigate = useNavigate();
  const [isOpened, setOpened] = useState(false);
  const [heightDescriptionBar, setHeightDescriptionBar] = useState(0);

  const referenceComponent: React.RefObject<HTMLInputElement> = createRef();

  useEffect(() => {
    setHeightDescriptionBar(
      (referenceComponent.current as HTMLElement).getBoundingClientRect().height
    );
  }, []);

  const toggleDescription = () => {
    setOpened((hasBeenOpened) => !hasBeenOpened);
  };

  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        text="Go back"
        appearance={ButtonStyleAppearance.system}
      ></Button>
      <div className={styleCard.wrapper}>
        <div className={styleCard.containerImg}>
          <div>
            {card.poster ? (
              <img src={card.poster.url}></img>
            ) : (
              <img src="/src/assets/BG/NoPoster.jpeg"></img>
            )}
          </div>
        </div>
        <div className={styleCard.containerDescription}>
          {card.genres.map((genre) => (
            <span key={genre.name}>
              {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}{' '}
            </span>
          ))}
          {card.alternativeName && <h1>{card.alternativeName}</h1>}
          {card.name && <h1>{card.name}</h1>}
          <div className={styleCard.rating}>
            <div>{card.rating.imdb}</div>
            <div>
              <IconIMDB /> {card.rating.imdb}
            </div>
            <div>{card.movieLength} min</div>
            <div className={styleCard.containerAge}>
              {card.ageRating >= 18 && <div>18+</div>}
            </div>
          </div>
          <p
            data-open={isOpened}
            ref={referenceComponent}
            style={
              heightDescriptionBar >= 50
                ? { maxHeight: '50px' }
                : { maxHeight: '100%' }
            }
          >
            {card.description}
          </p>
          {heightDescriptionBar >= 50 && (
            <Button
              onClick={() => toggleDescription()}
              appearance={ButtonStyleAppearance.system}
              text={isOpened ? 'close plot' : null}
              icon={isOpened ? null : <IconDown />}
            ></Button>
          )}
          <div>
            <div className={styleCard.shorts}>
              {card.year && (
                <div>
                  <span>Year</span>
                  <span>{card.year}</span>
                </div>
              )}
              {card.budget.value && (
                <div>
                  <span>Budget</span>
                  <span>
                    {card.budget.value} {card.budget.currency}
                  </span>
                </div>
              )}
              {card.countries && (
                <div>
                  <span>Country</span>
                  <span>
                    {card.countries.map((country) => (
                      <span key={country.name}>{country.name}</span>
                    ))}
                  </span>
                </div>
              )}
              {card.ageRating !== 0 && card.ageRating !== null && (
                <div>
                  <span>Age limit</span>
                  <span>{card.ageRating}+</span>
                </div>
              )}
            </div>
            <h2>Actors</h2>
            {card.persons && (
              <div className={styleCard.actors}>
                <SwiperCard actor={card.persons} />
              </div>
            )}
          </div>
          {card.videos !== undefined &&
            card.videos.trailers.find((item) =>
              item.url.includes('youtube.com/embed/')
            )?.url && (
              <>
                <h2>Trailer</h2>
                <iframe
                  src={
                    card.videos.trailers.find((item) =>
                      item.url.includes('youtube.com/embed/')
                    )?.url
                  }
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </>
            )}
          {card.similarMovies.length > 0 && (
            <>
              <h2>Recomendation</h2>
              <div className={styleCard.swiperWraper}>
                <SwiperCard card={card} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

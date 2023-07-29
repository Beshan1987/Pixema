import { Link, useNavigate } from 'react-router-dom';

import { type Persons } from '~/entities/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleCard from './Actors.module.scss';

export const Actors = ({ actors }: { actors: Persons }) => {
  const navigate = useNavigate();

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
            {actors.photo ? (
              <img src={actors.photo}></img>
            ) : (
              <img src="/src/assets/BG/NoPoster.jpeg"></img>
            )}
          </div>
        </div>
        <div className={styleCard.containerDescription}>
          {actors.enName && <h1>{actors.enName}</h1>}
          {actors.name && <h1>{actors.name}</h1>}

          <div>
            <div className={styleCard.shorts}>
              {actors.birthday && (
                <div>
                  <span>Birthday</span>
                  <span>{actors.birthday.slice(0, 10)}</span>
                </div>
              )}
              {actors.age && (
                <div key={actors.age}>
                  <span>Age</span>
                  <span>{actors.age}</span>
                </div>
              )}
              {actors.spouses.children && (
                <div key={actors.spouses.children}>
                  <span>Children</span>
                  <span>{actors.spouses.children}</span>
                </div>
              )}
              {actors.spouses.relation && (
                <div key={actors.spouses.relation}>
                  <span>Relation</span>
                  <span>{actors.spouses.relation}</span>
                </div>
              )}
              {actors.facts.length > 0 && (
                <div>
                  <span className={styleCard.facts}>Facts</span>
                  <span className={styleCard.facts}>
                    {actors.facts.map((facts) => (
                      <span key={facts.value}>{facts.value}</span>
                    ))}
                  </span>
                </div>
              )}
            </div>

            {actors.movies.length > 0 && (
              <>
                <h2>Actors movies:</h2>
                <div className={styleCard.swiperWraper}>
                  {actors.movies.map((movies) => (
                    <div key={movies.id}>
                      <Link
                        to={`/card/${movies.id}`}
                        className={styleCard.movies}
                      >
                        {movies.alternativeName && (
                          <span>{movies.alternativeName}</span>
                        )}
                        {movies.name && <span>{movies.name}</span>}
                        {movies.rating && (
                          <span className={styleCard.ratingMovie}>
                            rating: {movies.rating}
                          </span>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

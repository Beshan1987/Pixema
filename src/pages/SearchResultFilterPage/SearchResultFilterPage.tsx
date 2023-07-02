import { useEffect, useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { fetchSearchFilter } from '~/api/fetchSearchFilter';
import { type CardAPI } from '~/entities/Card';
import { Card } from '~/features/Card/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Pagination } from '~/shared/Pagintion/Pagination';

import styleSearchPage from './SearchResultFilterPage.module.scss';

export const SearchResultFilterPage = () => {
  const [card, setCard] = useState<CardAPI[]>([]);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [movieAll, setMovieAll] = useState<number>(1);
  const [error, setError] = useState('');
  const [searchParameters, setSearchParameters] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParameters.get('page')) || 1
  );
  const { request } = useParams<'request'>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchFilter({ request: request || '', page: page })
      .then((data) => {
        setCard(data.docs);
        setNumberPage(data.pages);
        setMovieAll(data.total);
      })
      .catch((error: Error) => setError(error.message));
    setSearchParameters((old) => {
      old.set('page', `${page}`);

      return old;
    });
  }, [request, page]);

  useEffect(() => {
    setPage(1);
  }, [request]);

  if (card) {
    return (
      <div className={styleSearchPage.container}>
        <div className={styleSearchPage.containerBtn}>
          <Button
            text={'Back to home'}
            appearance={ButtonStyleAppearance.system}
            onClick={() => navigate('/')}
          ></Button>
          {page > 1 ? (
            <Button
              onClick={() => setPage(1)}
              text={'Back to first page'}
              appearance={ButtonStyleAppearance.system}
            ></Button>
          ) : null}
        </div>
        {error && <div>{error}</div>}
        <h1>result of searching: {request}</h1>
        <h2>all found: {movieAll} movies</h2>
        <Card card={card} />
        <Pagination
          page={page}
          setPage={setPage}
          numberPage={numberPage}
        />
      </div>
    );
  }
  return (
    <div>
      <div>Movie not found!</div>
    </div>
  );
};

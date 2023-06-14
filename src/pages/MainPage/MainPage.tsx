import { useEffect, useState } from 'react';

import { fetchSearch } from '~/api/fetchSearch';
import { type SearchCard } from '~/entities/Card';
import { Card } from '~/features/Card/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Pagination } from '~/shared/Pagintion/Pagination';

export const MainPage = () => {
  const [card, setCard] = useState<SearchCard[]>([]);
  const [numberPage, setNumberPage] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchSearch({ request: 'man', page: page })
      .then((data) => {
        setCard(data.Search);
        setNumberPage(Math.floor(+data.totalResults / 10).toString());
      })
      .catch((error: Error) => setError(error.message));
  }, [page]);

  return (
    <div>
      {page > 1 ? (
        <Button
          onClick={() => setPage(1)}
          text={'Back to start'}
          appearance={ButtonStyleAppearance.pagination}
        ></Button>
      ) : null}
      {error ? <div>{error}</div> : null}
      <Card card={card} />
      <Pagination
        page={page}
        setPage={setPage}
        numberPage={numberPage}
      />
    </div>
  );
};

import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { fetchStart } from '~/api/fetchStart';
import { type CardAPI } from '~/entities/Card';
import { Card } from '~/features/Card/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Pagination } from '~/shared/Pagintion/Pagination';

export const MainPage = () => {
  const [card, setCard] = useState<CardAPI[]>([]);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [error, setError] = useState('');
  const [searchParameters, setSearchParameters] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParameters.get('page')) || 1
  );

  useEffect(() => {
    fetchStart({ page: page })
      .then((data) => {
        setCard(data.docs);
        setNumberPage(data.pages);
      })
      .catch((error: Error) => setError(error.message));
    setSearchParameters((old) => {
      old.set('page', `${page}`);

      return old;
    });
  }, [page]);

  return (
    <div>
      {page > 1 ? (
        <Button
          onClick={() => setPage(1)}
          text={'Back to first page'}
          appearance={ButtonStyleAppearance.system}
        ></Button>
      ) : null}
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <Card card={card} />
          <Pagination
            page={page}
            setPage={setPage}
            numberPage={numberPage}
          />
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';

import { fetchSearch } from '~/api/fetchSearch';
import { type SearchCard } from '~/entities/Card';
import { Card } from '~/features/Card/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleMain from './MainPage.module.scss';

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
      {error ? <div>{error}</div> : null}
      <Card card={card} />
      <div className={styleMain.pagination}>
        <Button
          text={'1'}
          onClick={() => setPage(1)}
          appearance={ButtonStyleAppearance.pagination}
        ></Button>
        <Button
          text={page.toString()}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          appearance={ButtonStyleAppearance.pagination}
        ></Button>
        <Button
          text={(page + 1).toString()}
          onClick={() => setPage(page + 1)}
          disabled={page === +numberPage}
          appearance={ButtonStyleAppearance.pagination}
        ></Button>
        <Button
          text={numberPage}
          onClick={() => setPage(+numberPage)}
          appearance={ButtonStyleAppearance.pagination}
        ></Button>
      </div>
    </div>
  );
};

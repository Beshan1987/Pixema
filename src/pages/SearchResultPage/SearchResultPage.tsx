import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { fetchSearch } from '~/api/fetchSearch';
import { type SearchCard } from '~/entities/Card';
import { Card } from '~/features/Card/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { type RootState } from '~/store';

import styleMain from './SearchPage.module.scss';

export const SearchResultPage = () => {
  const searchData = useSelector((state: RootState) => state.searchData.data);

  const [card, setCard] = useState<SearchCard[]>([]);
  const [numberPage, setNumberPage] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSearch({ request: searchData || '', page: page })
      .then((data) => {
        setCard(data.Search);
        setNumberPage(Math.floor(+data.totalResults / 10).toString());
      })
      .catch((error: Error) => setError(error.message));
  }, [searchData, page]);

  if (card) {
    return (
      <div>
        {error && <div>{error}</div>}
        <h1>result of searching: {searchData}</h1>
        <h2>all found: {+numberPage * 10}</h2>
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
  }
  return (
    <div>
      <div>Movie not found!</div>
    </div>
  );
};

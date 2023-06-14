import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { fetchSearch } from '~/api/fetchSearch';
import { type SearchCard } from '~/entities/Card';
import { Card } from '~/features/Card/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Pagination } from '~/shared/Pagintion/Pagination';
import { type RootState } from '~/store';

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
        {page > 1 ? (
          <Button
            onClick={() => setPage(1)}
            text={'Back to start'}
            appearance={ButtonStyleAppearance.pagination}
          ></Button>
        ) : null}
        {error && <div>{error}</div>}
        <h1>result of searching: {searchData}</h1>
        <h2>all found: {+numberPage * 10} movies</h2>
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

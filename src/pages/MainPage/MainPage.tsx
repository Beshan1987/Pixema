import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { fetchStart } from '~/api/fetchStart';
import { type CardAPI } from '~/entities/Card';
import { Card } from '~/features/Card/Card';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import styleMainPage from './MainPage.module.scss';

export const MainPage = () => {
  const [card, setCard] = useState<CardAPI[]>([]);
  const [numberPage, setNumberPage] = useState(0);
  const [error, setError] = useState('');
  const [searchParameters, setSearchParameters] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParameters.get('page')) || 1
  );

  useEffect(() => {
    fetchStart({ page: page })
      .then((data) => {
        setCard([...card, ...data.docs]);
        numberPage === 0 ? setNumberPage(data.pages) : null;
      })
      .catch((error: Error) => setError(error.message));
    setSearchParameters((old) => {
      old.set('page', `${page}`);

      return old;
    });
  }, [page]);

  return (
    <>
      {error && <div>{error}</div>}
      <div>
        <Card card={card} />
        <div className={styleMainPage.button}>
          <Button
            appearance={ButtonStyleAppearance.system}
            onClick={() => {
              setPage(page + 1);
              setNumberPage(numberPage - 1);
            }}
            text={'Show More'}
            disabled={numberPage === 1}
          />
        </div>
      </div>
    </>
  );
};

import { ReactComponent as IconLeft } from '~/assets/icons/IconChevronLeftPag.svg';
import { ReactComponent as IconRight } from '~/assets/icons/IconChevronRightPag.svg';

import stylePagination from './Pagination.module.scss';
import { Button } from '../Button/Button';
import { ButtonStyleAppearance } from '../Button/Button.types';

export const Pagination = ({
  page,
  setPage,
  numberPage
}: {
  page: number;
  setPage: (page: number) => void;
  numberPage: number;
}) => {
  return (
    <div className={stylePagination.pagination}>
      <Button
        text={'1'}
        onClick={() => {
          setPage(1);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }}
        appearance={ButtonStyleAppearance.pagination}
        style={page === 1 ? { display: 'none' } : { display: 'block' }}
      ></Button>
      <Button
        onClick={() => {
          setPage(page - 1);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }}
        disabled={page === 1}
        icon={<IconLeft />}
        appearance={ButtonStyleAppearance.pagination}
        style={page === 1 ? { display: 'none' } : { display: 'block' }}
      ></Button>
      <span>{numberPage !== 0 && page}</span>
      <Button
        onClick={() => {
          setPage(page + 1);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }}
        style={
          page === numberPage || numberPage === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
        appearance={ButtonStyleAppearance.pagination}
        icon={<IconRight />}
      ></Button>
      <Button
        text={numberPage}
        onClick={() => {
          setPage(+numberPage);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }}
        appearance={ButtonStyleAppearance.pagination}
        style={
          page === numberPage || numberPage === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
      ></Button>
    </div>
  );
};

import { type SearchState } from './Filter.types';

export function getDefaultFormValues(): SearchState {
  return {
    enName: '',
    yearFrom: '',
    yearTo: '',
    sortField: 'year',
    sortType: '-1',
    year: ''
  };
}

export const getRightRequest = ({ request }: { request: SearchState }) => {
  const { yearFrom, yearTo } = request;
  if (yearFrom && yearTo !== '') {
    request['year'] = `${yearFrom} - ${yearTo}`;
  }
  if (yearTo === '') {
    request['year'] = `${yearFrom}- ${new Date().getFullYear()}`;
  }
  return (
    '' +
    Object.entries(request)
      .filter((item) => item[1] !== '' && item[0] !== 'yearFrom' && 'yearTo')
      .map((item) => item.join('='))
      .join('&')
  );
};

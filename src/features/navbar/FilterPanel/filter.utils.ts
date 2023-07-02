import { type SearchState } from './Filter.types';

export function getDefaultFormValues(): SearchState {
  return {
    enName: '',
    year: '',
    sortField: 'year',
    sortType: -1
  };
}

export const getRightRequest = ({ request }: { request: SearchState }) => {
  return (
    '' +
    Object.entries(request)
      .filter((item) => item[1] !== '')
      .map((item) => item.join('='))
      .join('&')
  );
};

import { type FormErrors, type SearchState } from './Filter.types';

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

const MIN_YEAR_LENGTH = 4;

function isValidYearTo(year: SearchState['yearTo']): boolean {
  return year.length === MIN_YEAR_LENGTH || !year;
}
function isValidYearFrom(year: SearchState['yearFrom']): boolean {
  return year.length === MIN_YEAR_LENGTH || !year;
}

function isValidYearComparison({
  yearFrom,
  yearTo
}: {
  yearFrom: SearchState['yearFrom'];
  yearTo: SearchState['yearTo'];
}): boolean {
  return yearTo ? true : yearFrom <= yearTo;
}

function isValidYearCurrentYearTo({
  yearTo
}: {
  yearTo: SearchState['yearTo'];
}): boolean {
  return +yearTo < new Date().getFullYear() + 1;
}

function isValidYearCurrentYearFrom({
  yearFrom
}: {
  yearFrom: SearchState['yearTo'];
}): boolean {
  return +yearFrom < new Date().getFullYear() + 1;
}

export function getFormErrors(formValues: SearchState): FormErrors {
  const errors: FormErrors = {};

  if (!isValidYearTo(formValues.yearTo)) {
    errors.yearTo = '4 digit number';
  }

  if (!isValidYearFrom(formValues.yearFrom)) {
    errors.yearFrom = '4 digit number';
  }

  if (
    !isValidYearComparison({
      yearFrom: formValues.yearFrom,
      yearTo: formValues.yearTo
    })
  ) {
    errors.yearFrom = 'maybe vice versa';
  }
  if (!isValidYearCurrentYearTo({ yearTo: formValues.yearTo })) {
    errors.yearTo = 'check a year';
  }
  if (!isValidYearCurrentYearFrom({ yearFrom: formValues.yearFrom })) {
    errors.yearFrom = 'check a year';
  }

  return errors;
}

export const getRightRequest = ({ request }: { request: SearchState }) => {
  const { yearFrom, yearTo } = request;
  if (!!yearFrom && !!yearTo) {
    request['year'] = `${yearFrom} - ${yearTo}`;
  }

  if (!yearFrom && !yearTo) {
    request['year'] = `${yearFrom}-${new Date().getFullYear()}`;
  }

  if (!yearFrom && !!yearTo) {
    request['year'] = `0 - ${yearTo}`;
  }

  return (
    '' +
    Object.entries(request)
      .filter((item) => item[1] !== '' && item[0] !== 'yearFrom' && 'yearTo')
      .map((item) => item.join('='))
      .join('&')
  );
};

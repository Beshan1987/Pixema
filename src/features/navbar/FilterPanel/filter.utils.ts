import { type FormErrors, type SearchState } from './Filter.types';

export function getDefaultFormValues(): SearchState {
  return {
    enName: '',
    yearFrom: '',
    yearTo: '',
    sortField: 'year',
    sortType: '-1',
    year: '',
    rateFrom: '',
    rateTo: '',
    ['rating.imdb']: ''
  };
}

const MIN_YEAR_LENGTH = 4;
const RATE_VALID = { rateMax: 10, rateMin: 0 };

//check Year field
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
  return yearTo ? yearFrom <= yearTo : true;
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

//check Rating field
function isValidRateComparison({
  rateFrom,
  rateTo
}: {
  rateFrom: SearchState['rateFrom'];
  rateTo: SearchState['rateTo'];
}): boolean {
  return rateTo ? rateFrom <= rateTo : true;
}

function isValidRateTo({ rateTo }: { rateTo: SearchState['rateTo'] }): boolean {
  return +rateTo <= RATE_VALID.rateMax && +rateTo >= RATE_VALID.rateMin;
}

function isValidRateFrom({
  rateFrom
}: {
  rateFrom: SearchState['rateFrom'];
}): boolean {
  return +rateFrom <= RATE_VALID.rateMax && +rateFrom >= RATE_VALID.rateMin;
}

export function getFormErrors(formValues: SearchState): FormErrors {
  const errors: FormErrors = {};

  //get Year field error
  if (!isValidYearTo(formValues.yearTo)) {
    errors.yearTo = '4 digit number';
  }

  if (!isValidYearFrom(formValues.yearFrom)) {
    errors.yearFrom = '4 digit number';
  }

  if (!isValidYearTo(formValues.yearTo)) {
    errors.yearTo = '4 digit number';
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

  //get rate field error
  if (!isValidRateTo({ rateTo: formValues.rateTo })) {
    errors.rateTo = 'from 0 to 10';
  }

  if (!isValidRateFrom({ rateFrom: formValues.rateFrom })) {
    errors.rateFrom = 'from 0 to 10';
  }

  if (
    !isValidRateComparison({
      rateFrom: formValues.rateFrom,
      rateTo: formValues.rateTo
    })
  ) {
    errors.rateFrom = 'maybe vice versa';
  }

  return errors;
}

export const getRightRequest = ({ request }: { request: SearchState }) => {
  // get Year period request
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
  if (!!yearFrom && !yearTo) {
    request['year'] = `${yearFrom} - ${new Date().getFullYear()}`;
  }
  // get Rating interval request
  const { rateFrom, rateTo } = request;
  if (!!rateFrom && !!rateTo) {
    request['rating.imdb'] = `${rateFrom} - ${rateTo}`;
  }
  if (!rateFrom && !rateTo) {
    request['rating.imdb'] = '';
  }
  if (!rateFrom && !!rateTo) {
    request['rating.imdb'] = `${RATE_VALID.rateMin} - ${rateTo}`;
  }
  if (!!rateFrom && !rateTo) {
    request['rating.imdb'] = `${rateFrom} - ${RATE_VALID.rateMax}`;
  }

  //clean request and get the Whole Need request
  return (
    '' +
    Object.entries(request)
      .filter(
        (item) =>
          item[0] !== 'rateFrom' &&
          item[0] !== 'rateTo' &&
          item[0] !== 'yearTo' &&
          item[0] !== 'yearFrom'
      )
      .map((item) => item.join('='))
      .join('&')
  );
};

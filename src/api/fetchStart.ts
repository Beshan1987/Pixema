import axios, { AxiosHeaders } from 'axios';

import {
  AmountViewsMovie,
  KeyAdmin,
  PeriodYearRealease,
  RateIMBDSMainPage,
  type ResponseApiSearch,
  cardRequestFields
} from './constantsApi';

export async function fetchStart({
  page
}: {
  page: number;
}): Promise<ResponseApiSearch> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<ResponseApiSearch>(
    `https://api.kinopoisk.dev/v1.3/movie?year=${PeriodYearRealease}&page=${page}&audience.count=${AmountViewsMovie}&selectFields=${cardRequestFields.join(
      ' '
    )}&rating.imdb=${RateIMBDSMainPage}`,
    { headers }
  );

  return data;
}

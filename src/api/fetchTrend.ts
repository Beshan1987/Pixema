import axios, { AxiosHeaders } from 'axios';

import {
  AmountViewsMovieTrend,
  KeyAdmin,
  RateIMBDTrend,
  RateYear,
  type ResponseApiSearch,
  cardRequestFields
} from './constantsApi';

export async function fetchTrend({
  page
}: {
  page: number;
}): Promise<ResponseApiSearch> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<ResponseApiSearch>(
    `https://api.kinopoisk.dev/v1.3/movie?year=${RateYear}&page=${page}&audience.count=${AmountViewsMovieTrend}&selectFields=${cardRequestFields.join(
      ' '
    )}&rating.imdb=${RateIMBDTrend}`,
    { headers }
  );

  return data;
}

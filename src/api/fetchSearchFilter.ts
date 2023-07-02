import axios, { AxiosHeaders } from 'axios';

import {
  AmountViewsBlank,
  KeyAdmin,
  type ResponseApiSearch,
  cardRequestFields
} from './constantsApi';

export async function fetchSearchFilter({
  page,
  request
}: {
  page: number;
  request: string;
}): Promise<ResponseApiSearch> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<ResponseApiSearch>(
    `https://api.kinopoisk.dev/v1.3/movie?page=${page}&${request}&audience.count=${AmountViewsBlank}&selectFields=${cardRequestFields.join(
      ' '
    )}`,
    { headers }
  );

  return data;
}

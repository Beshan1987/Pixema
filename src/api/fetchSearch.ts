import axios, { AxiosHeaders } from 'axios';

import {
  AmountViewsBlank,
  KeyAdmin,
  type ResponseApiSearch,
  cardRequestFields
} from './constantsApi';

function isCyrillic(request: string) {
  return /[а-я]/i.test(request);
}

export async function fetchSearch({
  page,
  request
}: {
  page: number;
  request: string;
}): Promise<ResponseApiSearch> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<ResponseApiSearch>(
    `https://api.kinopoisk.dev/v1.3/movie?$page=${page}}&audience.count=${AmountViewsBlank}&selectFields=${cardRequestFields.join(
      ' '
    )}${isCyrillic(request) ? `&name=${request}` : `&enName=${request}`}`,
    { headers }
  );

  return data;
}

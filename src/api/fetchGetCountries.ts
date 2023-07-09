import axios, { AxiosHeaders } from 'axios';

import { KeyAdmin } from './constantsApi';

export type Countries = {
  name: string;
};

export async function fetchGetCountries(): Promise<Countries[]> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<Countries[]>(
    `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name`,
    { headers }
  );

  return data;
}

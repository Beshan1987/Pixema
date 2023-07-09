import axios, { AxiosHeaders } from 'axios';

import { KeyAdmin } from './constantsApi';

export type Genres = {
  name: string;
};

export async function fetchGetGenres(): Promise<Genres[]> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<Genres[]>(
    `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name`,
    { headers }
  );

  return data;
}

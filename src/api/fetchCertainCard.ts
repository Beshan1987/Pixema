import axios, { AxiosHeaders } from 'axios';

import { type CardAPI } from '~/entities/Card';

import { KeyAdmin } from './constantsApi';

export async function fetchCertainCard(id: number | string): Promise<CardAPI> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<CardAPI>(
    `https://api.kinopoisk.dev/v1.3/movie/${id}`,
    { headers }
  );

  return data;
}

import axios, { AxiosHeaders } from 'axios';

import { type CardAPI } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

export async function fetchCertainCard(id: number | string): Promise<CardAPI> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `4CTXY50-B5JMC9P-Q6E6KXJ-WRYJH15`);
  const { data } = await axios<CardAPI>(
    `https://api.kinopoisk.dev/v1.3/movie/${id}`,
    { headers }
  );

  return data;
}

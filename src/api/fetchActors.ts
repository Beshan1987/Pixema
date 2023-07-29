import axios, { AxiosHeaders } from 'axios';

import { type Persons } from '~/entities/Card';

import { KeyAdmin } from './constantsApi';

export async function fetchActors(id: number | string): Promise<Persons> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `${KeyAdmin}`);
  const { data } = await axios<Persons>(
    `https://api.kinopoisk.dev/v1/person/${id}`,
    { headers }
  );

  return data;
}

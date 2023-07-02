import axios, { AxiosHeaders } from 'axios';

import { type CardAPI } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

type ResponseStartPage = {
  docs: CardAPI[];
  page: number;
  pages: number;
  total: number;
};

export async function fetchStart({
  page
}: {
  page: number;
}): Promise<ResponseStartPage> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `4CTXY50-B5JMC9P-Q6E6KXJ-WRYJH15`);
  const { data } = await axios<ResponseStartPage>(
    `https://api.kinopoisk.dev/v1.3/movie?year=2015-2023&page=${page}&audience.count=1000000-10000000`,
    { headers }
  );

  return data;
}

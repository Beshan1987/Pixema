import axios, { AxiosHeaders } from 'axios';

import { type CardAPI } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

function isCyrillic(request: string) {
  return /[а-я]/i.test(request);
}

type ResponseSearchtPage = {
  docs: CardAPI[];
  page: number;
  pages: number;
  total: number;
};

export async function fetchSearch({
  page,
  request
}: {
  page: number;
  request: string;
}): Promise<ResponseSearchtPage> {
  const headers = new AxiosHeaders();
  headers.set('X-API-KEY', `4CTXY50-B5JMC9P-Q6E6KXJ-WRYJH15`);
  const { data } = await axios<ResponseSearchtPage>(
    `https://api.kinopoisk.dev/v1.3/movie?${
      isCyrillic(request) ? `&name=${request}` : `&enName=${request}`
    }&page=${page}`,
    { headers }
  );

  return data;
}

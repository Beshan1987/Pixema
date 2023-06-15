import axios from 'axios';

import { type CardAPI } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

export async function fetchCertainCard(id: number | string): Promise<CardAPI> {
  const { data } = await axios<CardAPI>(
    `https://www.omdbapi.com/?apikey=94df158a&i=${id}&plot=full`
  );

  return data;
}

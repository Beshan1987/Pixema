import axios from 'axios';

import { type SearchCard } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

type ResponseSearch = {
  Response: string;
  Search: SearchCard[];
  totalResults: string;
};

export async function fetchSearchFilter({
  title,
  year,
  page
}: {
  title: string;
  year: string;
  page: number;
}): Promise<ResponseSearch> {
  const { data } = await axios<ResponseSearch>(
    `https://www.omdbapi.com/?apikey=94df158a&s=${title}&y=${year}&p=${page}`
  );

  return data;
}

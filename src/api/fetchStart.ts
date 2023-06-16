import axios from 'axios';

import { type SearchCard } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

type ResponseSearch = {
  Response: string;
  Search: SearchCard[];
  totalResults: string;
};

export async function fetchStart({
  request,
  page
}: {
  request: string;
  page: number;
}): Promise<ResponseSearch> {
  const year = Math.floor(Math.random() * (2024 - 2020) + 2010);
  const { data } = await axios<ResponseSearch>(
    `https://www.omdbapi.com/?apikey=94df158a&s=${request}&page=${page}&y=${year}`
  );

  return data;
}

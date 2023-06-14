import { type SearchCard } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

type ResponseSearch = {
  Response: string;
  Search: SearchCard[];
  totalResults: string;
};

export async function fetchSearch({
  request,
  page
}: {
  request: string;
  page: number;
}): Promise<ResponseSearch> {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=94df158a&s=${request}&page=${page}`
  );
  if (response.ok) {
    const data = (await response.json()) as ResponseSearch;
    return data;
  }

  const message = (await response.json()) as Record<'Error', string>;
  throw new Error(Object.values(message).join(''));
}

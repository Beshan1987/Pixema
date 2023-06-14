import { type CardAPI } from '~/entities/Card';

// import { BASE_API_URL } from './constants';

export async function fetchCertainCard(id: number | string): Promise<CardAPI> {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=94df158a&i=${id}&plot=full`
  );

  if (response.ok) {
    const data = (await response.json()) as CardAPI;
    return data;
  }
  throw new Error(
    `request failed: ${response.status} (${response.statusText})`
  );
}

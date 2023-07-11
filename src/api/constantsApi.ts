import { type CardAPI } from '~/entities/Card';

export const BASE_API_URL = import.meta.env.VITE_API_URL as string;

export const cardRequestFields = [
  'name',
  'year',
  'rating',
  'poster',
  'type',
  'audience',
  'alternativeName',
  'id',
  'videos',
  'ageRating',
  'persons',
  'countries',
  'genres',
  'movieLength',
  'Budget',
  'similarMovies'
];

export const KeyAdmin = '123JCBS-NWP4J7K-G8E3WRF-VYBPZMZ';

export const AmountViewsMovie = '500000-10000000';
export const AmountViewsBlank = '1-1000000000';

export const PeriodYearRealease = '2018-2023';
export const RateIMBDTrend = '6.5-10';
export const RateIMBDSMainPage = '7-10';
export const AmountViewsMovieTrend = '1000000-1000000000';
export const RateYear = '2022-2023';

export type ResponseApiSearch = {
  docs: CardAPI[];
  page: number;
  pages: number;
  total: number;
};

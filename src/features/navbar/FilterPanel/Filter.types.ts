export interface SearchState {
  enName: string;
  name?: string;
  yearFrom: string;
  yearTo: string;
  sortField: string;
  sortType: string;
  year?: string;
  rateFrom: string;
  rateTo: string;
  ['rating.imdb']?: string;
  ['genres.name']?: string;
}

export type FormErrors = Partial<Record<keyof SearchState, string>>;

export type Ratings = {
  Source: string;
  Value: string;
};

export interface Pagination {
  current_page: number;
  from: number;
  to: number;
  per_page: number;
  last_page: number;
  total: number;
  data: CardAPI[];
}

export interface Genres {
  display_name: string;
  id: string;
  name: string;
  type: string;
}

export interface CardApiCertain extends CardAPI {
  genres: Genres[];
}

interface Budget {
  value: number;
  currency: string;
}

interface Persons {
  id: number;
  photo: string;
  name: string;
  enName: string;
  description: string;
  profession: string;
  enProfession: string;
}

export interface SimilarMovies {
  id: number;
  name: string;
  enName: string;
  alternativeName: string;
  type: string;
  poster: Record<'url', string>;
}

interface Trailer {
  name: string;
  type: string;
  url: string;
}

interface Sequels {
  alternativeName: string;
  name: string;
  poster: Record<'url', string>;
}

export interface CardAPI {
  alternativeName: string;
  name: string;
  countries: Record<'name', string>[];
  description: string;
  genres: Record<'name', string>[];
  id: number;
  movieLength: number;
  poster: Record<'url', string>;
  rating: Record<'imdb', number>;
  type: string;
  votes: Record<'imdb', number>;
  year: number;
  budget: Budget;
  persons: Persons[];
  top250: number;
  productionCompanies: Record<'name', string>;
  similarMovies: SimilarMovies[];
  videos: Record<'trailers', Trailer[]>;
  ageRating: number;
  sequelsAndPrequels: Sequels[];
}

export interface SearchCard {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface SearchState {
  enName: string;
  yearFrom: string;
  yearTo: string;
  sortField: string;
  sortType: string;
  year?: string;
}

export type FormErrors = Partial<Record<keyof SearchState, string>>;

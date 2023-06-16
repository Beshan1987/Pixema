import { type SearchState } from './Filter.types';

export function getDefaultFormValues(): SearchState {
  return {
    title: '',
    year: ''
  };
}

export interface MoviesFiltersState {
  title: string;
  yearFrom: number | null;
  yearTo: number | null;
  genre: string[];
  director: string;
}

export interface Range<T> {
  from: T;
  to: T;
}
import { httpClient } from './httpClient';

export interface Movie {
  Title: string;
  Year: number;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
}

export interface MoviesResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
}

export const moviesApi = {
  searchMovies: async (page: number = 1): Promise<MoviesResponse> => {
    return httpClient(`http://localhost:3000/api/movies/search?page=${page}`);
  },
};

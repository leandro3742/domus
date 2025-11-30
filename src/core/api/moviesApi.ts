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
  searchMoviesAll: async (): Promise<Movie[]> => {
    let page = 1;
    const allMovies: Movie[] = [];
    const response = await httpClient(
      `http://localhost:3000/api/movies/search?page=${page}`
    );
    const total = response.total_pages;
    while (page <= total) {
      const response = await httpClient(
        `http://localhost:3000/api/movies/search?page=${page}`
      );
      allMovies.push(...response.data);
      page++;
    }
    return allMovies;
  },
};

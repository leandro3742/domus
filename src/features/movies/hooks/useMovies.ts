import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { moviesApi } from '../../../core/api/moviesApi';

interface UseMoviesOptions {
  page?: number;
  enabled?: boolean;
}

export const useMovies = ({
  page = 1,
  enabled = true,
}: UseMoviesOptions = {}) => {
  return useQuery({
    queryKey: ['movies', page],
    queryFn: () => moviesApi.searchMovies(page),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

interface UseInfiniteMoviesOptions {
  enabled?: boolean;
}

export const useInfiniteMovies = ({
  enabled = true,
}: UseInfiniteMoviesOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ['movies', 'infinite'],
    queryFn: ({ pageParam = 1 }) => moviesApi.searchMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

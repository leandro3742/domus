import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '../../../core/api/moviesApi';
import type { Movie } from '../../../core/api/moviesApi';
import { useMemo } from 'react';
import { aggregateDirectors } from '../../../core/lib/aggregateDirectors';

const useAllMovies = () => {
  return useQuery({
    queryKey: ['movies_all'],
    queryFn: () => moviesApi.searchMoviesAll(),
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDirectors = (threshold: number) => {
  const query = useAllMovies();

  const directors = useMemo(
    () =>
      aggregateDirectors(
        query.data?.map((movie: Movie) => movie.Director) ?? [],
        { trim: true, caseFolding: false }
      ),
    [query.data]
  );

  const directorsFiltered = useMemo(
    () =>
      Object.entries(directors)
        .filter(([, count]) => count >= threshold)
        .sort(([nameA], [nameB]) => nameA.localeCompare(nameB)),
    [directors, threshold]
  );

  return {
    ...query,
    directors,
    directorsFiltered,
  };
};
